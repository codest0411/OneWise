'use client'

import { ReactNode } from 'react'

type AuthScaffoldProps = {
  badge: string
  title: string
  description: string
  highlights: { title: string; body: string }[]
  accent?: 'indigo' | 'pink' | 'emerald'
  children: ReactNode
}

const accentMap: Record<NonNullable<AuthScaffoldProps['accent']>, string> = {
  indigo: 'from-indigo-500/60 via-blue-500/40 to-cyan-400/30',
  pink: 'from-pink-500/60 via-rose-500/40 to-orange-400/30',
  emerald: 'from-emerald-500/60 via-teal-500/40 to-lime-400/30',
}

export default function AuthScaffold({ badge, title, description, highlights, accent = 'indigo', children }: AuthScaffoldProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accentMap[accent]} blur-3xl opacity-40`} />
      <div className="relative max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
              {badge}
              <span className="h-1 w-1 rounded-full bg-white/70" />
              Secure Access
            </span>
            <div>
              <h1 className="text-4xl lg:text-5xl font-semibold">{title}</h1>
              <p className="mt-4 text-lg text-white/70">{description}</p>
            </div>
            <div className="space-y-4">
              {highlights.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-wide text-white/60">{feature.title}</p>
                  <p className="mt-1 text-base text-white/90">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-black/30 border border-white/10 p-8 lg:p-10 text-slate-900 dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
