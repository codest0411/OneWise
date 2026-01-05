'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuth from '../../../hooks/useAuth'
import { Video, BookOpen, Clock } from 'lucide-react'

type Session = {
  id: string
  title: string
  status: string
  scheduled_at?: string
  participants?: any[]
}

export default function StudentDashboard() {
  const router = useRouter()
  const { user, loading, logout, session } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loadingSessions, setLoadingSessions] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.replace('/auth/student/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (user && session) {
      fetchSessions()
    }
  }, [user, session])

  const fetchSessions = async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
      if (!apiBase) {
        console.warn('NEXT_PUBLIC_API_URL is not configured; skipping student session fetch')
        setSessions([])
        setLoadingSessions(false)
        return
      }
      const headers: Record<string, string> = {}
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
      const response = await fetch(`${apiBase}/api/sessions`, { headers })
      if (response.ok) {
        const data = await response.json()
        setSessions(data.data || [])
      } else {
        const message = await response.text()
        console.warn('Failed to fetch student sessions:', response.status, message)
        setSessions([])
      }
    } catch (error) {
      console.warn('Failed to fetch student sessions:', error)
      setSessions([])
    } finally {
      setLoadingSessions(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 text-white backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <div className="w-2 h-6 bg-blue-600 rounded-sm" />
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-blue-600">One</span>
                  <span className="text-orange-500">Wise</span>
                </span>
              </div>
              <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium">
                Student
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">{user.email}</span>
              <button
                onClick={() => logout()}
                className="px-4 py-2 text-sm font-medium text-white/90 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Join mentorship sessions and learn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joined Sessions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{sessions.length}</p>
              </div>
              <Video className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Now</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {sessions.filter(s => s.status === 'live').length}
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {sessions.filter(s => s.status === 'scheduled').length}
                </p>
              </div>
              <Clock className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Sessions</h3>
            <Link
              href="/student/join-session"
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Join with Code
            </Link>
          </div>

          {loadingSessions ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No sessions joined yet</p>
              <Link
                href="/student/join-session"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Join with Code
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/session/${session.id}`)}
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{session.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: <span className="capitalize">{session.status}</span>
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  )
}
