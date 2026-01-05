'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuth from '../../../hooks/useAuth'
import { ArrowLeft, CheckCircle2, QrCode } from 'lucide-react'

export default function StudentJoinSessionPage() {
  const router = useRouter()
  const { user, loading, session } = useAuth()
  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ''), [])

  const [sessionCode, setSessionCode] = useState('')
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.replace('/auth/student/login')
    }
  }, [loading, user, router])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!sessionCode.trim()) {
      setError('Please enter a session code or ID')
      return
    }

    setJoining(true)
    try {
      if (!apiBase) {
        // fall back to client-side navigation when API isn't configured
        router.push(`/session/${sessionCode.trim()}`)
        return
      }

      if (!session?.access_token) {
        setError('Missing authentication token. Please sign in again and retry.')
        return
      }

      const response = await fetch(`${apiBase}/api/sessions/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ code: sessionCode.trim() }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Unable to join session. Double-check the code.')
      }

      const data = (await response.json()) as { data?: { session_id?: string } }
      const sessionId = data.data?.session_id ?? sessionCode.trim()

      setSuccess('Successfully joined! Redirecting you to the session...')
      setTimeout(() => {
        router.push(`/session/${sessionId}`)
      }, 1200)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to join session')
    } finally {
      setJoining(false)
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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/student/dashboard" className="inline-flex items-center text-white/70 hover:text-white transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-sm text-white/70">Signed in as {user.email}</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Join a Session</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Enter the session code shared by your mentor. You will be redirected to the live session room instantly.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-emerald-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {success}
            </div>
          )}

          {!apiBase && (
            <div className="mb-6 rounded-2xl border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-200 text-sm">
              <strong>Heads up:</strong> API URL not configured. We will attempt to join the session directly via the client route.
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Session Code or ID</label>
              <input
                type="text"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="e.g., session-abc123"
              />
            </div>

            <button
              type="submit"
              disabled={joining}
              className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joining ? 'Joining session...' : 'Join Session'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
