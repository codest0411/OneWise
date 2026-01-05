export type User = {
  id: string
  name?: string
  email?: string
  role?: 'mentor' | 'student'
  user_metadata?: Record<string, any>
  app_metadata?: Record<string, any>
  created_at?: string
}

export type ChatMessage = {
  id: string
  author?: User | { id?: string; name?: string }
  text: string
  time?: string
  isOwn?: boolean
}

export type Session = {
  id: string
  title?: string
  mentor?: User
  student?: User
  startedAt?: string
}
