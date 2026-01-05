'use client'

import { useCallback, useMemo, useRef } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'

type Props = {
  value: string
  language?: string
  readOnly?: boolean
  onChange: (value: string) => void
}

export default function CollaborativeMonaco({ value, language = 'javascript', readOnly = false, onChange }: Props) {
  const lastValueRef = useRef(value)

  const handleChange = useCallback(
    (nextValue?: string) => {
      if (typeof nextValue !== 'string') return
      lastValueRef.current = nextValue
      onChange(nextValue)
    },
    [onChange]
  )

  const onMount = useCallback<OnMount>((editor) => {
    editor.focus()
  }, [])

  const options = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 14,
      readOnly,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
    }),
    [readOnly]
  )

  return (
    <div className="h-full w-full bg-[#0f172a]">
      <Editor
        height="100%"
        language={language}
        defaultLanguage={language}
        theme="vs-dark"
        value={value}
        onChange={handleChange}
        onMount={onMount}
        options={options}
      />
    </div>
  )
}
