'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface DraggableWindowProps {
  title: string
  subtitle?: string
  isMinimized: boolean
  onMinimize: () => void
  onClose: () => void
  children: ReactNode
  defaultWidth?: number
  defaultHeight?: number
  minWidth?: number
  minHeight?: number
  className?: string
}

export default function DraggableWindow({
  title,
  subtitle,
  isMinimized,
  onMinimize,
  onClose,
  children,
  defaultWidth = 400,
  defaultHeight = 500,
  minWidth = 300,
  minHeight = 200,
  className = '',
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      } else if (isResizing) {
        const newWidth = Math.max(minWidth, resizeStart.width + (e.clientX - resizeStart.x))
        const newHeight = Math.max(minHeight, resizeStart.height + (e.clientY - resizeStart.y))
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, minWidth, minHeight])

  const handleDragStart = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    })
    setIsResizing(true)
  }

  return (
    <div
      ref={windowRef}
      className={`fixed bg-gray-900 border border-gray-700 rounded-lg shadow-2xl ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: isMinimized ? 'auto' : `${size.height}px`,
        zIndex: 50,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-gray-800 cursor-move select-none"
        onMouseDown={handleDragStart}
      >
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="px-3 py-1 text-xs rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
          >
            {isMinimized ? 'Open' : 'Minimize'}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="overflow-hidden" style={{ height: `calc(${size.height}px - 48px)` }}>
            {children}
          </div>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResizeStart}
            style={{
              background: 'linear-gradient(135deg, transparent 50%, #4b5563 50%)',
            }}
          />
        </>
      )}
    </div>
  )
}
