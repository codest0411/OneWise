import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'



type AnyEventMap = Record<string, any>

type Handler = (...args: any[]) => void

type SocketEvent<T extends AnyEventMap> = Extract<keyof T, string> | string

export type UseSocketReturn<T extends AnyEventMap = AnyEventMap> = {
  socket: Socket | null
  connected: boolean
  emit: (event: SocketEvent<T>, ...args: any[]) => void
  on: (event: SocketEvent<T>, handler: Handler) => (() => void)
  off: (event: SocketEvent<T>, handler?: Handler) => void
  once: (event: SocketEvent<T>, handler: Handler) => void
}

export default function useSocket<T extends AnyEventMap = AnyEventMap>(url?: string): UseSocketReturn<T> {
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const targetUrl = url ?? process.env.NEXT_PUBLIC_SOCKET_URL ?? ''

  useEffect(() => {
    if (!targetUrl) {
      console.warn('No socket server URL configured. Set NEXT_PUBLIC_SOCKET_URL or pass a url to useSocket(). Skipping connection.')
      return
    }

    // Create socket connection
    const socket = io(targetUrl, { autoConnect: true, transports: ['websocket'], reconnectionAttempts: 5 })
    socketRef.current = socket

    const handleConnect = () => setConnected(true)
    const handleDisconnect = () => setConnected(false)
    const handleError = (err: Error) => {
      console.error('Socket connect error', err)
      setConnected(false)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleError)

    // Cleanup on unmount
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleError)
      socket.close()
      socketRef.current = null
    }
  }, [targetUrl])

  const emit = useCallback((event: SocketEvent<T>, ...args: any[]) => {
    socketRef.current?.emit(event, ...args)
  }, [])

  const on = useCallback((event: SocketEvent<T>, handler: Handler) => {
    socketRef.current?.on(event, handler)
    // Return an unsubscribe function for convenience
    return () => {
      socketRef.current?.off(event, handler)
    }
  }, [])

  const off = useCallback((event: SocketEvent<T>, handler?: Handler) => {
    if (handler) socketRef.current?.off(event, handler)
    else socketRef.current?.removeAllListeners(event)
  }, [])

  const once = useCallback((event: SocketEvent<T>, handler: Handler) => {
    socketRef.current?.once(event, handler)
  }, [])

  return { socket: socketRef.current, connected, emit, on, off, once }
}
