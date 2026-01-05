'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthScaffold from '../../../components/auth/AuthScaffold'
import useAuth from '../../../hooks/useAuth'

const highlights = [
  { title: 'Encrypted at rest', body: 'Passwords are hashed using Supabase Auth with bcrypt and never stored in plain text.' },
  { title: 'One-time link', body: 'Reset links expire automatically and can only be used once per request.' },
  { title: 'Session isolation', body: 'Upon update we refresh your session and invalidate other access tokens.' },
]

export default function UpdatePasswordPage() {
  const router = useRouter()
  const { updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus(null)

    if (!password || !confirmPassword) {
      setError('Please fill in both fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords must match')
      return
    }

    setLoading(true)
    const { error } = await updatePassword(password)
    if (error) {
      setError(error.message ?? 'Unable to update password')
    } else {
      setStatus('Password updated. Redirecting you to the dashboard…')
      setTimeout(() => router.push('/dashboard'), 1800)
    }
    setLoading(false)
  }

  return (
    <AuthScaffold
      badge="Sensitive action"
      title="Set a fresh password."
      description="This page is only accessible from a secure email link. Complete the update to regain access to your workspace."
      highlights={highlights}
      accent="emerald"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-600 dark:text-slate-200">
            New password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 px-4 py-3 text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-white/80"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-600 dark:text-slate-200">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 px-4 py-3 text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-white/80"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
        {status && <p className="text-sm text-emerald-600 dark:text-emerald-400">{status}</p>}

        <button
          type="submit"
          className="w-full rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:opacity-95 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Updating…' : 'Update password securely'}
        </button>
      </form>
    </AuthScaffold>
  )
}
