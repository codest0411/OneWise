'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'

type RequireAuthProps = {
  children: ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter()
  const { user, session, loading } = useAuth()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/auth/login')
    }
  }, [loading, session, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300">
        Checking access…
      </div>
    )
  }

  if (!session || !user) {
    return null
  }

  return <>{children}</>
}
