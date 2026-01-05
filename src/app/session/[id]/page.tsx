'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useAuth from '../../../hooks/useAuth'
import CollaborativeMonaco from '../../../components/editor/CollaborativeMonaco'
import DraggableWindow from '../../../components/DraggableWindow'
import { Mic, MicOff, Video, VideoOff, Phone, Copy, Check, ArrowUp, ArrowDown, ChevronsDown, Play } from 'lucide-react'
import { io, Socket } from 'socket.io-client'

const DEFAULT_LANGUAGE = 'javascript'

const LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'Go', value: 'go' },
]

const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `// JavaScript starter code
console.log('Hello from JavaScript!');
console.log('Current time:', new Date().toISOString());

// Example: Calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log('Factorial of 5:', factorial(5));
`,
  typescript: `// TypeScript starter code
const greeting: string = 'Hello from TypeScript!';
console.log(greeting);

interface User {
  name: string;
  age: number;
}

const user: User = { name: 'Alice', age: 30 };
console.log('User:', user);
`,
  python: `# Python starter code
import math
from datetime import datetime

print("Hello from Python!")
print(f"Current time: {datetime.now()}")

# Example: Calculate factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"Factorial of 5: {factorial(5)}")
print(f"Square root of 16: {math.sqrt(16)}")
`,
  java: `// Java starter code
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        System.out.println("Current time: " + Instant.now());
        
        // Example: Calculate factorial
        System.out.println("Factorial of 5: " + factorial(5));
    }
    
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}
`,
  csharp: `// C# starter code
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello from C#!");
        Console.WriteLine($"Current time: {DateTime.Now}");
        
        // Example: Calculate factorial
        Console.WriteLine($"Factorial of 5: {Factorial(5)}");
    }
    
    static int Factorial(int n)
    {
        if (n <= 1) return 1;
        return n * Factorial(n - 1);
    }
}
`,
  go: `// Go starter code
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Hello from Go!")
	fmt.Println("Current time:", time.Now())
	
	// Example: Calculate factorial
	fmt.Println("Factorial of 5:", factorial(5))
}

func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * factorial(n-1)
}
`,
}

const FALLBACK_SNIPPET = '// Start coding here...'

const normalizeLanguage = (value?: string) => {
  if (!value) return DEFAULT_LANGUAGE
  const lower = value.toLowerCase()
  return Object.prototype.hasOwnProperty.call(LANGUAGE_TEMPLATES, lower) ? lower : DEFAULT_LANGUAGE
}

type Message = {
  id: string
  author: string
  text: string
  time: string
}

type RunResult = {
  id: string
  author: string
  authorId?: string
  language: string
  output?: string
  error?: string
  time: string
  executionTime?: number
}

type SessionDetails = {
  id: string
  title: string
  allow_collab: boolean
  allow_chat: boolean
  allow_video: boolean
  metadata?: Record<string, any>
  participants?: {
    user_id: string
    role: string
    can_edit?: boolean
    can_share_screen?: boolean
  }[]
}

const resolveAuthorName = (author: any): string => {
  if (!author) return 'Participant'
  if (typeof author === 'string') return author
  if (typeof author === 'object') {
    return author.name ?? author.email ?? author.id ?? 'Participant'
  }
  return 'Participant'
}

const formatIncomingMessage = (payload: any): Message => {
  const fallbackTime = new Date()
  let formattedTime = fallbackTime.toLocaleTimeString()
  if (payload?.time) {
    const parsed = new Date(payload.time)
    if (!Number.isNaN(parsed.valueOf())) {
      formattedTime = parsed.toLocaleTimeString()
    }
  }

  return {
    id: payload?.id ?? fallbackTime.getTime().toString(),
    author: resolveAuthorName(payload?.author),
    text: payload?.text ?? '',
    time: formattedTime,
  }
}

const formatIncomingRunResult = (payload: any): RunResult => {
  const fallbackTime = new Date()
  let formattedTime = fallbackTime.toLocaleTimeString()
  if (payload?.time) {
    const parsed = new Date(payload.time)
    if (!Number.isNaN(parsed.valueOf())) {
      formattedTime = parsed.toLocaleTimeString()
    }
  }

  return {
    id: payload?.id ?? fallbackTime.getTime().toString(),
    author: resolveAuthorName(payload?.author),
    authorId: payload?.authorId,
    language: normalizeLanguage(payload?.language),
    output: payload?.output ?? '',
    error: payload?.error ?? '',
    time: formattedTime,
    executionTime: payload?.executionTime,
  }
}

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading, session } = useAuth()
  const sessionId = params?.id as string

  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null)
  const [code, setCode] = useState(LANGUAGE_TEMPLATES[DEFAULT_LANGUAGE] ?? FALLBACK_SNIPPET)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(true)
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true)
  const [copied, setCopied] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [permissionPending, setPermissionPending] = useState<Record<string, boolean>>({})
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const [languageBuffers, setLanguageBuffers] = useState<Record<string, string>>(() => {
    const baseline: Record<string, string> = {}
    Object.entries(LANGUAGE_TEMPLATES).forEach(([key, snippet]) => {
      baseline[key] = snippet
    })
    return baseline
  })
  const [runResults, setRunResults] = useState<RunResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [terminalMinimized, setTerminalMinimized] = useState(false)
  const [chatWindowVisible, setChatWindowVisible] = useState(false)
  const [chatWindowMinimized, setChatWindowMinimized] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const languageRef = useRef(DEFAULT_LANGUAGE)
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const sessionTitle = sessionDetails?.title ?? 'Session'

  const isMentor = useMemo(() => {
    if (!sessionDetails) return false
    const participant = sessionDetails.participants?.find((p) => p.user_id === user?.id)
    return participant?.role === 'mentor'
  }, [sessionDetails, user?.id])

  const canEdit = useMemo(() => {
    if (!sessionDetails) return false
    if (!sessionDetails.allow_collab) return false
    const participant = sessionDetails.participants?.find((p) => p.user_id === user?.id)
    if (!participant) return false
    if (participant.role === 'mentor') return true
    return Boolean(participant.can_edit)
  }, [sessionDetails, user?.id])

  const sortedParticipants = useMemo(() => {
    if (!sessionDetails?.participants) return []
    return [...sessionDetails.participants].sort((a, b) => {
      if (a.role === b.role) return a.user_id.localeCompare(b.user_id)
      return a.role === 'mentor' ? -1 : 1
    })
  }, [sessionDetails])

  const teardownCall = useCallback(
    (options?: { emit?: boolean; redirectTo?: string }) => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
        localStreamRef.current = null
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.ontrack = null
        peerConnectionRef.current.onicecandidate = null
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }

      if (options?.emit) {
        socketRef.current?.emit('webrtc:end')
      }

      setCallActive(false)
      setIsAudioEnabled(false)
      setIsVideoEnabled(false)

      if (options?.redirectTo) {
        router.push(options.redirectTo)
      }
    },
    [router]
  )

  useEffect(() => {
    languageRef.current = language
  }, [language])

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/student/login')
      return
    }

    if (user && session?.access_token) {
      fetchSession()
      initializeMedia()
      connectSocket(session.access_token)
    }

    return () => {
      teardownCall()
      socketRef.current?.disconnect()
    }
  }, [user, loading, sessionId, session?.access_token, router, teardownCall])

  const fetchSession = async () => {
    try {
      if (!session?.access_token) {
        throw new Error('Missing session token')
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      if (response.ok) {
        const { data } = await response.json()
        setSessionDetails(data)
        const initialLanguage = normalizeLanguage(data?.metadata?.language ?? data?.metadata?.initialLanguage)
        const initialCode = data?.metadata?.initialCode ?? LANGUAGE_TEMPLATES[initialLanguage] ?? FALLBACK_SNIPPET
        setLanguage(initialLanguage)
        setCode(initialCode)
        setLanguageBuffers((prev) => ({ ...prev, [initialLanguage]: initialCode }))
      } else if (response.status === 403) {
        router.replace('/auth/student/login')
      }
    } catch (error) {
      console.error('Failed to fetch session:', error)
    }
  }

  const attachLocalTracks = useCallback((stream: MediaStream) => {
    const pc = peerConnectionRef.current
    if (!pc) return
    stream.getTracks().forEach((track) => {
      const existingSender = pc.getSenders().find((sender) => sender.track && sender.track.kind === track.kind)
      if (existingSender) {
        existingSender.replaceTrack(track)
      } else {
        pc.addTrack(track, stream)
      }
    })
  }, [])

  const createPeerConnection = useCallback(() => {
    if (peerConnectionRef.current) return peerConnectionRef.current

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit('webrtc:ice-candidate', { candidate: event.candidate })
      }
    }

    pc.ontrack = (event) => {
      console.log('Received remote track:', event.track.kind)
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0]
        setCallActive(true)
      }
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!)
      })
    }

    peerConnectionRef.current = pc
    return pc
  }, [])

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      const audioTrack = stream.getAudioTracks()[0]
      const videoTrack = stream.getVideoTracks()[0]
      setIsAudioEnabled(audioTrack?.enabled ?? true)
      setIsVideoEnabled(videoTrack?.enabled ?? true)
      console.log('Media initialized:', { audio: !!audioTrack, video: !!videoTrack })
      
      // Broadcast initial media state to other participants
      socketRef.current?.emit('media:state', { audio: audioTrack?.enabled ?? true, video: videoTrack?.enabled ?? true })
    } catch (error) {
      console.error('Failed to initialize media:', error)
      alert('Failed to access camera/microphone. Please allow permissions and refresh.')
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
        socketRef.current?.emit('media:state', { audio: audioTrack.enabled, video: isVideoEnabled })
        attachLocalTracks(localStreamRef.current)
      }
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
        socketRef.current?.emit('media:state', { audio: isAudioEnabled, video: videoTrack.enabled })
        attachLocalTracks(localStreamRef.current)
      }
    }
  }

  const endCall = () => {
    const redirectPath = isMentor ? '/mentor/dashboard' : '/student/dashboard'
    teardownCall({ emit: false, redirectTo: redirectPath })
  }

  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined || !canEdit) return
    setCode(value)
    setLanguageBuffers((prev) => ({ ...prev, [languageRef.current]: value }))
    socketRef.current?.emit('code:update', { code: value, language: languageRef.current })
  }

  const handleLanguageSelect = (nextValue: string) => {
    const normalized = normalizeLanguage(nextValue)
    setLanguageBuffers((prev) => {
      const updated = { ...prev, [languageRef.current]: code }
      if (!updated[normalized]) {
        updated[normalized] = LANGUAGE_TEMPLATES[normalized] ?? FALLBACK_SNIPPET
      }
      const nextCode = updated[normalized]
      setLanguage(normalized)
      setCode(nextCode)
      socketRef.current?.emit('code:update', { code: nextCode, language: normalized })
      return updated
    })
  }

  const scrollChat = (direction: 'up' | 'down' | 'bottom') => {
    if (!chatScrollRef.current) return
    if (direction === 'bottom') {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' })
      return
    }
    const delta = direction === 'up' ? -200 : 200
    chatScrollRef.current.scrollBy({ top: delta, behavior: 'smooth' })
  }

  const runCode = () => {
    if (!socketRef.current || !code.trim()) return
    setIsRunning(true)
    setTerminalVisible(true)
    setTerminalMinimized(false)
    socketRef.current.emit('code:run', { code, language: languageRef.current }, (res?: { ok?: boolean; message?: string }) => {
      setIsRunning(false)
      if (!res?.ok) {
        console.error(res?.message ?? 'Failed to run code')
      }
    })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      author: user?.name || user?.email || 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    }

    const outgoing = {
      id: message.id,
      text: message.text,
      time: new Date().toISOString(),
    }

    socketRef.current?.emit('chat:message', outgoing, (res?: { ok?: boolean }) => {
      if (!res?.ok) {
        console.error('Message failed to send')
      }
    })
    setNewMessage('')
  }

  const connectSocket = (token: string) => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL ?? '', {
      auth: { token },
    })

    socket.on('connect', () => {
      socket.emit('session:join', { sessionId }, (res?: { ok?: boolean }) => {
        if (res?.ok) {
          socket.emit('webrtc:ready')
          // Broadcast current media state when reconnecting
          if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0]
            const videoTrack = localStreamRef.current.getVideoTracks()[0]
            socket.emit('media:state', { audio: audioTrack?.enabled ?? true, video: videoTrack?.enabled ?? true })
          }
        }
      })
    })

    socket.on('chat:message', (payload) => {
      setMessages((prev) => [...prev, formatIncomingMessage(payload)])
    })

    socket.on('code:update', (payload) => {
      if (!payload?.code || payload.authorId === user?.id) return
      const nextLanguage = normalizeLanguage(payload.language ?? languageRef.current)
      setLanguage(nextLanguage)
      setCode(payload.code)
      setLanguageBuffers((prev) => ({ ...prev, [nextLanguage]: payload.code }))
    })

    socket.on('code:run-result', (payload) => {
      setTerminalVisible(true)
      setRunResults((prev) => [formatIncomingRunResult(payload), ...prev].slice(0, 20))
    })

    socket.on('webrtc:ready', async () => {
      try {
        console.log('Received webrtc:ready, creating offer')
        const pc = createPeerConnection()
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        socket.emit('webrtc:offer', { sdp: offer })
        console.log('Sent offer')
      } catch (error) {
        console.error('Failed to create offer', error)
      }
    })

    socket.on('webrtc:offer', async ({ sdp }) => {
      try {
        console.log('Received offer')
        const pc = createPeerConnection()
        await pc.setRemoteDescription(new RTCSessionDescription(sdp))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        socket.emit('webrtc:answer', { sdp: answer })
        console.log('Sent answer')
      } catch (error) {
        console.error('Failed to handle offer', error)
      }
    })

    socket.on('webrtc:answer', async ({ sdp }) => {
      try {
        console.log('Received answer')
        const pc = createPeerConnection()
        await pc.setRemoteDescription(new RTCSessionDescription(sdp))
        console.log('Set remote description from answer')
      } catch (error) {
        console.error('Failed to handle answer', error)
      }
    })

    socket.on('webrtc:ice-candidate', async ({ candidate }) => {
      try {
        if (candidate) {
          const pc = createPeerConnection()
          await pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
      } catch (error) {
        console.error('Error adding received ice candidate', error)
      }
    })

    socket.on('webrtc:end', () => {
      teardownCall()
    })

    socket.on('media:state', (payload) => {
      if (payload?.audio !== undefined) {
        setRemoteAudioEnabled(payload.audio)
      }
      if (payload?.video !== undefined) {
        setRemoteVideoEnabled(payload.video)
      }
    })

    socket.on('permissions:update', (payload) => {
      setSessionDetails((prev) => {
        if (!prev?.participants) return prev
        const updated = prev.participants.map((participant) => {
          if (participant.user_id === payload?.user_id) {
            return {
              ...participant,
              can_edit: payload?.can_edit ?? participant.can_edit,
              can_share_screen: payload?.can_share_screen ?? participant.can_share_screen,
            }
          }
          return participant
        })
        return { ...prev, participants: updated }
      })
    })

    socket.on('session:error', (err) => {
      console.error(err)
    })

    socketRef.current = socket
  }

  const toggleParticipantEditPermission = (participantId: string, nextValue: boolean) => {
    if (!socketRef.current) return
    setPermissionPending((prev) => ({ ...prev, [participantId]: true }))
    socketRef.current.emit('permissions:update', { userId: participantId, canEdit: nextValue }, (res?: { ok?: boolean; message?: string }) => {
      if (res?.ok) {
        setPermissionPending((prev) => {
          const clone = { ...prev }
          delete clone[participantId]
          return clone
        })
        return
      }
      console.error('Failed to update permissions', res?.message)
      setPermissionPending((prev) => {
        const clone = { ...prev }
        delete clone[participantId]
        return clone
      })
    })
  }

  const copySessionLink = () => {
    const link = `${window.location.origin}/session/${sessionId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading session...</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{sessionTitle}</h1>
            <p className="text-sm text-gray-400">Session ID: {sessionId}</p>
          </div>
          <button
            onClick={copySessionLink}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center gap-3">
              <label htmlFor="language-select" className="text-sm text-gray-400">
                Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => handleLanguageSelect(e.target.value)}
                className="bg-gray-800 text-white text-sm rounded-lg px-3 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {callActive ? 'In Call' : 'Connecting...'}
              </div>
              <button
                onClick={runCode}
                disabled={isRunning || !code.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isRunning ? 'bg-gray-700 text-gray-300 cursor-wait' : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running…' : 'Run'}
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-900">
            <CollaborativeMonaco value={code} language={language} onChange={handleCodeChange} readOnly={!canEdit} />
          </div>
        </div>

        <div className="w-96 flex flex-col border-l border-gray-800 bg-gray-900 p-4 space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />
            {(!callActive || !remoteVideoEnabled) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  {sessionDetails?.participants?.find((p) => p.user_id !== user?.id)?.user_id?.charAt(0)?.toUpperCase() || 'P'}
                </div>
              </div>
            )}
            {!remoteAudioEnabled && remoteVideoEnabled && callActive && (
              <div className="absolute top-2 left-2 bg-red-600 rounded-full p-2">
                <MicOff className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="absolute bottom-2 right-2 w-32 h-24 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                    {user?.email?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'Y'}
                  </div>
                </div>
              )}
              {!isAudioEnabled && isVideoEnabled && (
                <div className="absolute top-1 left-1 bg-red-600 rounded-full p-1">
                  <MicOff className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isVideoEnabled ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
            </button>
            <button onClick={endCall} className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
              <Phone className="w-5 h-5 text-white" />
            </button>
          </div>

          {isMentor && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
              <h2 className="text-sm font-semibold text-white mb-2">Participants</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {sortedParticipants.map((participant) => {
                  const isSelf = participant.user_id === user?.id
                  const toggleable = participant.role !== 'mentor' && isMentor && !isSelf
                  const pending = permissionPending[participant.user_id]
                  return (
                    <div key={participant.user_id} className="flex items-center justify-between text-sm text-gray-300 gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          {participant.role === 'mentor' ? 'Mentor' : 'Student'}
                          {isSelf ? ' (You)' : ''}
                        </span>
                        <span className="text-xs text-gray-500 truncate">{participant.user_id}</span>
                      </div>
                      {toggleable ? (
                        <button
                          disabled={pending}
                          onClick={() => toggleParticipantEditPermission(participant.user_id, !participant.can_edit)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                            participant.can_edit
                              ? 'bg-green-600 hover:bg-green-500 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                          } ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {pending ? 'Updating...' : participant.can_edit ? 'Revoke Edit' : 'Grant Edit'}
                        </button>
                      ) : (
                        <span className="text-xs uppercase tracking-wide text-gray-500">{participant.role}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => setChatWindowVisible((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>Chat Window</span>
              <span className="text-xs text-gray-300">{chatWindowVisible ? 'Open' : 'Closed'}</span>
            </button>
            <button
              onClick={() => setTerminalVisible((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>Run Output Panel</span>
              <span className="text-xs text-gray-300">{terminalVisible ? 'Open' : 'Closed'}</span>
            </button>
          </div>
        </div>
      </div>

      {chatWindowVisible && (
        <DraggableWindow
          title="Chat"
          subtitle="Visible to all participants"
          isMinimized={chatWindowMinimized}
          onMinimize={() => setChatWindowMinimized((prev) => !prev)}
          onClose={() => {
            setChatWindowVisible(false)
            setChatWindowMinimized(false)
          }}
          defaultWidth={400}
          defaultHeight={500}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end gap-2 px-4 py-2 border-b border-gray-800">
              <button
                onClick={() => scrollChat('up')}
                className="p-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollChat('down')}
                className="p-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollChat('bottom')}
                className="p-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              >
                <ChevronsDown className="w-4 h-4" />
              </button>
            </div>
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{msg.author}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-200">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </DraggableWindow>
      )}

      {terminalVisible && (
        <DraggableWindow
          title="Terminal"
          subtitle="Shared run output"
          isMinimized={terminalMinimized}
          onMinimize={() => setTerminalMinimized((prev) => !prev)}
          onClose={() => {
            setTerminalVisible(false)
            setTerminalMinimized(false)
          }}
          defaultWidth={600}
          defaultHeight={450}
          className="bg-[#0f172a]"
        >
          <div className="h-full overflow-y-auto px-4 py-3 space-y-3">
            {runResults.length === 0 ? (
              <div className="text-sm text-gray-400">Waiting for output...</div>
            ) : (
              runResults.map((result) => (
                <div key={result.id} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="uppercase tracking-wide">{result.language}</span>
                      {result.executionTime !== undefined && (
                        <span className="text-green-400">({result.executionTime}ms)</span>
                      )}
                    </div>
                    <span>{result.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{result.author}</p>
                  {result.output && (
                    <pre className="mt-2 text-xs text-gray-200 whitespace-pre-wrap">{result.output}</pre>
                  )}
                  {result.error && (
                    <pre className="mt-2 text-xs text-red-300 whitespace-pre-wrap">{result.error}</pre>
                  )}
                </div>
              ))
            )}
          </div>
        </DraggableWindow>
      )}
    </div>
  )
}
