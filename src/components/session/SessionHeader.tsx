'use client'

import React from 'react'
import Link from 'next/link'
import { Session } from '../../types'

export type SessionHeaderProps = {
  session: Session
}

export default function SessionHeader({ session }: SessionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{session.title ?? 'Session'}</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">ID: {session.id}</div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-sm border border-gray-200 dark:border-gray-700">Back to dashboard</Link>
        <button className="px-3 py-1 rounded-md bg-red-600 text-white text-sm">End session</button>
      </div>
    </div>
  )
}
