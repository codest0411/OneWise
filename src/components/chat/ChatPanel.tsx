'use client'

import React, { useEffect, useRef, useState } from 'react'

export type ChatMessage = {
  id?: string | number
  author?: string
  text: string
  time?: string
  isOwn?: boolean
}

export type ChatPanelProps = {
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
  placeholder?: string
}

export default function ChatPanel({ messages, onSendMessage, placeholder = 'Type a message...' }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    onSendMessage(text)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">No messages yet. Say hello 👋</div>
        ) : (
          messages.map((m, idx) => {
            const isOwn = m.isOwn || m.author === 'me'
            const stableKey = m.id ?? m.time ?? `${m.author ?? 'anon'}-${idx}`
            return (
              <div key={stableKey} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${isOwn ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                  {m.author && !isOwn && <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{m.author}</div>}
                  <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                  {m.time && <div className="text-xs text-gray-400 mt-1 text-right">{m.time}</div>}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Message"
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={handleSend} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium">Send</button>
        </div>
      </div>
    </div>
  )
}
