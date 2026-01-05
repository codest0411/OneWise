'use client'

import { useState, useEffect } from 'react'

interface SimpleCodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
}

export default function SimpleCodeEditor({ value, onChange, language = 'javascript' }: SimpleCodeEditorProps) {
  const [code, setCode] = useState(value)

  useEffect(() => {
    setCode(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCode(newValue)
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newValue = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newValue)
      onChange(newValue)
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="h-full w-full bg-gray-900 relative">
      <div className="absolute top-2 right-2 px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded">
        {language}
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
        style={{
          lineHeight: '1.5',
          tabSize: 2,
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  )
}
