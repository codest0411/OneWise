'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuth from '../../../hooks/useAuth'
import { ArrowLeft, CalendarPlus, Copy, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react'

type CreatedSession = {
  id: string
  title: string
  invite_code: string
  status: string
  allow_collab: boolean
  allow_chat: boolean
  allow_video: boolean
  scheduled_at: string | null
}

export default function MentorCreateSessionPage() {
  const router = useRouter()
  const { user, loading, session } = useAuth()
  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ''), [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantIds, setParticipantIds] = useState('')
  const [allowCollab, setAllowCollab] = useState(true)
  const [allowChat, setAllowChat] = useState(true)
  const [allowVideo, setAllowVideo] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [createdSession, setCreatedSession] = useState<CreatedSession | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'mentor')) {
      router.replace('/auth/mentor/login')
    }
  }, [loading, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setCreatedSession(null)
    setCopied(false)

    if (!title.trim()) {
      setError('Please provide a session title')
      return
    }

    if (!apiBase) {
      setError('API URL is not configured. Please set NEXT_PUBLIC_API_URL to enable session creation.')
      return
    }

    if (!session?.access_token) {
      setError('Missing authentication token. Please re-login and try again.')
      return
    }

    setSubmitting(true)
    try {
      const participants = participantIds
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)

      const response = await fetch(`${apiBase}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          summary: description.trim() || undefined,
          allow_collab: allowCollab,
          allow_chat: allowChat,
          allow_video: allowVideo,
          participant_ids: participants,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to create session')
      }

      const data = await response.json()
      const sessionData = data.data as CreatedSession | undefined

      if (!sessionData?.id) {
        throw new Error('API did not return the new session. Please try again.')
      }

      setCreatedSession(sessionData)
      setSuccess('Session created successfully!')
    } catch (err: any) {
      setError(err?.message ?? 'Failed to create session')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopyInvite = async () => {
    if (!createdSession?.invite_code) return
    try {
      await navigator.clipboard.writeText(createdSession.invite_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/mentor/dashboard" className="inline-flex items-center text-white/70 hover:text-white transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-sm text-white/70">Signed in as {user.email}</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <CalendarPlus className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Create a New Session</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Set up a mentorship session, add optional description, and invite participants. Once created, you can share the
            session link directly with your students.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg space-y-6">
          {createdSession && (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
                <div>
                  <p className="text-lg font-semibold">Invite code ready</p>
                  <p className="text-sm text-emerald-100/80">Share this code with your students to let them join instantly.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-emerald-100/70 mb-1 uppercase tracking-wide">Session Code</p>
                  <p className="text-2xl font-mono">{createdSession.invite_code}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyInvite}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-white/20 hover:border-white/40 transition"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/session/${createdSession.id}`)}
                  className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-white/90 text-slate-900 font-semibold hover:bg-white"
                >
                  Open Session
                </button>
              </div>
            </div>
          )}

          {!apiBase && (
            <div className="mb-6 rounded-2xl border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-200 text-sm">
              <strong>Heads up:</strong> The API URL is not configured. Add <code className="bg-black/20 px-2 py-0.5 rounded">NEXT_PUBLIC_API_URL</code> in
              your environment to enable real session creation.
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-emerald-200 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Session Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Portfolio Review, DSA Deep Dive, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Outline what you plan to cover, required prep, resources, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Participant IDs (optional)</label>
              <input
                type="text"
                value={participantIds}
                onChange={(e) => setParticipantIds(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Comma separated student IDs (e.g., abc-123, def-456)"
              />
              <p className="text-xs text-white/60 mt-2">Leave blank to create a session without pre-invited students.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => setAllowCollab((prev) => !prev)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition ${
                  allowCollab ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/5'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">Collaborative Editing</p>
                  <p className="text-xs text-white/70">Allow students to edit in Monaco.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAllowChat((prev) => !prev)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition ${
                  allowChat ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/5'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">Chat</p>
                  <p className="text-xs text-white/70">Enable session chat history.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAllowVideo((prev) => !prev)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition ${
                  allowVideo ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/5'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">Video / Screen</p>
                  <p className="text-xs text-white/70">Allow WebRTC calls + screen share.</p>
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating session...' : 'Create Session'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
