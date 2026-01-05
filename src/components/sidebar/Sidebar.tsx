'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'

export default function Sidebar() {
  const pathname = usePathname() || '/dashboard'
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const nav = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Sessions', href: '/dashboard/sessions' },
    { name: 'Profile', href: '/dashboard/profile' },
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('logout error', err)
    } finally {
      router.push('/')
    }
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-lg text-gray-900 dark:text-gray-100">OneWise</div>
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen((s) => !s)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {open && (
          <nav className="px-4 pb-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                handleLogout()
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/30"
            >
              Logout
            </button>
          </nav>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="h-16 flex items-center px-6 font-bold text-lg text-gray-900 dark:text-gray-100">OneWise</div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-4 w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 dark:text-red-300 dark:border-red-900/40 dark:hover:bg-red-900/30"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
