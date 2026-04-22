import React, { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { html } from 'react-strict-dom'
import { styles } from './ContextMenu.styles'
import { MENU_WIDTH } from './ContextMenu.config'

type HtmlDivProps = React.ComponentProps<typeof html.div>

export type ContextMenuProps = Omit<HtmlDivProps, 'children'> & {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  menuWidth?: number
  fullWidth?: boolean
  testID?: string
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  function ContextMenu(
    { trigger, children, open, onOpenChange, menuWidth = MENU_WIDTH, fullWidth = false, testID, ...rest },
    ref
  ) {
    const isControlled = open !== undefined
    const [internalOpen, setInternalOpen] = useState(false)
    const isOpen = isControlled ? open : internalOpen
    const triggerRef = useRef<HTMLDivElement>(null)
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    const toggle = useCallback(() => {
      setOpen(!isOpen)
    }, [setOpen, isOpen])

    const close = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    useEffect(() => {
      if (!isOpen) return
      if (typeof document === 'undefined') return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, close])

    useEffect(() => {
      if (!isOpen || !triggerRef.current) return
      if (typeof window === 'undefined') return

      const updateRect = () => {
        if (triggerRef.current) {
          setTriggerRect(triggerRef.current.getBoundingClientRect())
        }
      }

      updateRect()
      window.addEventListener('scroll', updateRect, true)
      window.addEventListener('resize', updateRect)
      return () => {
        window.removeEventListener('scroll', updateRect, true)
        window.removeEventListener('resize', updateRect)
      }
    }, [isOpen])

    const wrapperStyle = fullWidth ? styles.triggerWrapperFullWidth : styles.triggerWrapper

    const menuTop = triggerRect ? triggerRect.bottom + 5 : 0
    const menuLeft = triggerRect ? Math.max(triggerRect.right - menuWidth, 0) : 0

    return (
      <html.div {...rest} ref={ref} data-testid={testID} style={wrapperStyle}>
        <html.div
          ref={triggerRef}
          onClick={toggle}
          style={fullWidth ? styles.triggerInner : undefined}
        >
          {trigger}
        </html.div>

        {isOpen && typeof document !== 'undefined' && triggerRect && createPortal(
          <>
            <html.div style={styles.overlay} onClick={close} />
            <html.div
              role="menu"
              style={[styles.menuContainer, styles.menuPosition(menuTop, menuLeft, menuWidth)]}
              onClick={close}
            >
              {children}
            </html.div>
          </>,
          document.body
        )}
      </html.div>
    )
  }
)

ContextMenu.displayName = 'ContextMenu'
