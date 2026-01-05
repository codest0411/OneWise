'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'

const quickActions = [
  { label: 'Edit profile', href: '#edit-profile' },
  { label: 'Notification settings', href: '/dashboard/notifications' },
  { label: 'Billing & plans', href: '/dashboard/billing' },
  { label: 'View sessions', href: '/dashboard/sessions' },
]

export default function ProfilePage() {
  const { user, loading, error, getSession } = useAuth()

  useEffect(() => {
    getSession()
  }, [getSession])

  const stats = useMemo(
    () => [
      { label: 'Completed sessions', value: user?.user_metadata?.completedSessions ?? '48' },
      { label: 'Mentor rating', value: user?.user_metadata?.rating ?? '4.9/5' },
      { label: 'Students mentored', value: user?.user_metadata?.studentsMentored ?? '32' },
    ],
    [user]
  )

  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
  const basicInfo = [
    { label: 'Name', value: user?.user_metadata?.name ?? '—' },
    { label: 'Email', value: user?.email ?? '—' },
    { label: 'Timezone', value: timezone },
    { label: 'Plan', value: user?.app_metadata?.plan ?? 'Pro Mentor · Monthly' },
  ]

  const [profileForm, setProfileForm] = useState({
    name: user?.user_metadata?.name ?? '',
    headline: user?.user_metadata?.headline ?? 'Product Engineer · Mentor',
    bio:
      user?.user_metadata?.bio ??
      'I help mid-level engineers grow into senior roles with hands-on systems design and frontend coaching.',
  })
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    setProfileForm((prev) => ({
      ...prev,
      name: user?.user_metadata?.name ?? prev.name,
      headline: user?.user_metadata?.headline ?? prev.headline,
      bio: user?.user_metadata?.bio ?? prev.bio,
    }))
  }, [user])

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaveState('saving')
    setTimeout(() => {
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2000)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,70,255,0.35),transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 space-y-12">
          <header className="flex flex-col gap-4">
            <p className="text-sm text-white/60">Profile</p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold">Aparna V.</h1>
                <p className="text-white/70">Product Engineer · Frontend / Systems Design Mentor</p>
              </div>
              <div className="flex gap-3">
                <Link href="/session/demo" className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 transition">
                  Start live session
                </Link>
                <Link href="/dashboard" className="px-4 py-2 rounded-full border border-white/30 hover:border-white transition">
                  Go to dashboard
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur">
                <p className="text-sm text-white/60">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-3">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                I help mid-level engineers grow into senior roles through deep dives on systems design, code reviews, and
                pair programming. My sessions combine real production examples, interactive exercises, and clear action plans.
                Track progress, share notes, and collaborate live inside OneWise.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Design Systems', 'Interviews'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/15 text-sm text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-2">
              <h2 className="text-lg font-semibold">Quick actions</h2>
              <ul className="mt-4 space-y-3">
                {quickActions.map((action) => (
                  <li key={action.label}>
                    <Link
                      href={action.href}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:border-white/40 transition"
                    >
                      {action.label}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Basic info</h2>
                <p className="text-sm text-white/60">Keep your public profile up to date for mentees.</p>
              </div>
              <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/20">
                {basicInfo.map((row) => (
                  <div key={row.label} className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-white/60">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <a href="#edit-profile" className="text-sm text-indigo-300 hover:text-indigo-100">
                  Update details →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-red-200">Danger zone</h2>
                <p className="text-sm text-white/60">Permanently remove your OneWise account and associated data.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                <p className="font-medium text-white mb-2">Before deleting</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>All scheduled sessions will be cancelled.</li>
                  <li>Chat history and notes will be removed.</li>
                  <li>This action cannot be undone.</li>
                </ul>
              </div>
              <button className="w-full rounded-2xl border border-red-500/40 bg-red-600/20 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-600/30 transition">
                Delete account
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Upcoming sessions</h2>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Scaling React Apps', date: 'Jan 04 · 08:30 PM IST' },
                { title: 'Systems Design deep dive', date: 'Jan 07 · 06:00 PM IST' },
              ].map((session) => (
                <div key={session.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-white/60">{session.date}</p>
                  </div>
                  <Link href="/session/demo" className="text-sm text-indigo-300 hover:text-indigo-200">
                    Open session
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section id="edit-profile" className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Edit profile</h2>
                <p className="text-sm text-white/60">Update how mentees see you across OneWise.</p>
              </div>
              {saveState === 'saved' && <span className="text-sm text-emerald-300">Saved!</span>}
            </div>
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <div>
                <label className="block text-sm text-white/70 mb-1">Name</label>
                <input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Headline</label>
                <input
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, headline: e.target.value }))}
                  className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Changes are stored locally for now.</p>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold"
                  disabled={saveState === 'saving'}
                >
                  {saveState === 'saving' ? 'Saving...' : 'Save profile'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
