'use client'

import { createContext, createElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { User } from '../types'

export type UserRole = 'student' | 'mentor'

export type SignupResult = {
  data?: any
  error?: { message?: string }
}

export type LoginResult = {
  data?: any
  error?: { message?: string }
}

type ProfileRecord = {
  role?: UserRole | null
  name?: string | null
  headline?: string | null
  bio?: string | null
  avatar_url?: string | null
}

const fetchProfileByUserId = async (userId?: string): Promise<ProfileRecord | null> => {
  if (!userId) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('role, name, headline, bio, avatar_url')
    .eq('id', userId)
    .maybeSingle()
  if (error) {
    // PGRST116 means no rows returned; ignore quietly.
    if ((error as any)?.code !== 'PGRST116') {
      console.warn('fetchProfileByUserId error', error)
    }
    return null
  }
  return data ?? null
}

const mergeProfileWithUser = (user: User | null, profile: ProfileRecord | null): User | null => {
  if (!user || !profile) return user
  return {
    ...user,
    name: user.name ?? profile.name ?? undefined,
    role: (profile.role as UserRole | undefined) ?? user.role,
  }
}

const enrichUserWithProfile = async (rawUser?: any): Promise<User | null> => {
  const normalized = normalizeUser(rawUser)
  if (!normalized?.id) return normalized
  if (normalized.role && normalized.name) return normalized
  const profile = await fetchProfileByUserId(normalized.id)
  return mergeProfileWithUser(normalized, profile)
}

const resolveUserRole = async (rawUser?: any): Promise<UserRole | undefined> => {
  const fromMetadata = inferRole(rawUser)
  if (fromMetadata) return fromMetadata
  const profile = await fetchProfileByUserId(rawUser?.id)
  return (profile?.role ?? undefined) as UserRole | undefined
}

const buildResetRedirectUrl = () => {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (base) return `${base}/auth/update-password`
  if (typeof window !== 'undefined') return `${window.location.origin}/auth/update-password`
  return undefined
}

export type UseAuthReturn = {
  user: User | null
  session: any | null
  loading: boolean
  error: string | null
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<SignupResult>
  login: (email: string, password: string, role?: UserRole) => Promise<LoginResult>
  logout: () => Promise<void>
  getSession: () => Promise<any>
  requestPasswordReset: (email: string) => Promise<{ error?: { message?: string } }>
  updatePassword: (password: string) => Promise<{ error?: { message?: string } }>
}

const AuthContext = createContext<UseAuthReturn | undefined>(undefined)

const inferRole = (rawUser?: any): UserRole | undefined => {
  if (!rawUser) return undefined
  return (rawUser?.user_metadata as any)?.role ?? (rawUser?.app_metadata as any)?.role
}

const normalizeUser = (rawUser?: any): User | null => {
  if (!rawUser) return null
  const role = inferRole(rawUser)
  return { ...(rawUser as User), role }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const applySessionUser = async (nextSession: any) => {
      const enriched = await enrichUserWithProfile(nextSession?.user)
      if (!mounted) return
      setUser(enriched)
    }

    setLoading(true)
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setSession(data?.session ?? null)
        await applySessionUser(data?.session ?? null)
      } catch (err) {
        console.error('getSession error', err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setSession(session ?? null)
      void (async () => {
        await applySessionUser(session ?? null)
        if (mounted) setLoading(false)
      })()
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole = 'student') => {
    setLoading(true)
    setError(null)
    try {
      // sign up with metadata (name)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      })
      if (error) {
        setError(error.message)
        return { error }
      }
      // If sign up returned a session, set user/session
      if (data?.session) {
        setSession(data.session)
        const enriched = await enrichUserWithProfile(data.session.user)
        setUser(enriched)
      }
      return { data }
    } catch (err: any) {
      const msg = err?.message ?? 'Signup failed'
      setError(msg)
      return { error: { message: msg } }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string, role?: UserRole) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        return { error }
      }
      if (role) {
        const signedInUser = (data.user ?? data.session?.user) as User | undefined
        const userRole = await resolveUserRole(signedInUser)
        if (userRole !== role) {
          await supabase.auth.signOut()
          const roleError = {
            message:
              userRole != null
                ? `This account is registered as ${userRole}. Use the ${userRole === 'mentor' ? 'mentor' : 'student'} portal to continue.`
                : 'Unable to verify the role for this account. Please contact support.',
          }
          setError(roleError.message)
          return { error: roleError }
        }
      }
      if (data?.session) {
        setSession(data.session)
        const enriched = await enrichUserWithProfile(data.session.user)
        setUser(enriched)
      }
      return { data }
    } catch (err: any) {
      const msg = err?.message ?? 'Login failed'
      setError(msg)
      return { error: { message: msg } }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
    } catch (err: any) {
      console.error('logout error', err)
      setError(err?.message ?? 'Logout failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const requestPasswordReset = useCallback(async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      const redirectTo = buildResetRedirectUrl()
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined)
      if (error) {
        setError(error.message)
        return { error }
      }
      return { data }
    } catch (err: any) {
      const msg = err?.message ?? 'Reset request failed'
      setError(msg)
      return { error: { message: msg } }
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) {
        setError(error.message)
        return { error }
      }
      if (data?.user) {
        setUser(normalizeUser(data.user) ?? null)
      }
      return { data }
    } catch (err: any) {
      const msg = err?.message ?? 'Password update failed'
      setError(msg)
      return { error: { message: msg } }
    } finally {
      setLoading(false)
    }
  }, [])

  const getSession = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await supabase.auth.getSession()
      setSession(data?.session ?? null)
      const enriched = await enrichUserWithProfile(data?.session?.user)
      setUser(enriched)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo<UseAuthReturn>(
    () => ({
      user,
      session,
      loading,
      error,
      signup,
      login,
      logout,
      getSession,
      requestPasswordReset,
      updatePassword,
    }),
    [user, session, loading, error, signup, login, logout, getSession, requestPasswordReset, updatePassword]
  )

  return createElement(AuthContext.Provider, { value }, children)
}

export default function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
