'use client'

import React from 'react'

export type VideoPanelProps = {
  className?: string
}

export default function VideoPanel({ className = '' }: VideoPanelProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-black h-48 flex items-center justify-center">
        <div className="text-sm text-gray-200">Remote video placeholder</div>
      </div>

      <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-black h-28 flex items-center justify-between p-3">
        <div className="text-sm text-gray-200">Local preview</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 text-sm">Mute</button>
          <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 text-sm">Stop cam</button>
        </div>
      </div>
    </div>
  )
}
