import React from 'react'
import { html } from 'react-strict-dom'

type HtmlDivProps = React.ComponentProps<typeof html.div>

export type PressableProps = HtmlDivProps & {
  onPressIn?: () => void
  onPressOut?: () => void
  onLongPress?: () => void
  delayLongPress?: number
}

export const Pressable = React.forwardRef<HTMLDivElement, PressableProps>(
  function Pressable({ onPressIn, onPressOut, onLongPress, delayLongPress, children, ...rest }, ref) {
    const longPressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleTouchStart = () => {
      onPressIn?.()
      if (onLongPress) {
        longPressTimer.current = setTimeout(onLongPress, delayLongPress ?? 500)
      }
    }

    const handleTouchEnd = () => {
      onPressOut?.()
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }

    return (
      <html.div
        {...rest}
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {children}
      </html.div>
    )
  }
)

Pressable.displayName = 'Pressable'
