import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './FieldError.styles'
import { ErrorFilled } from '../../icons'
import { useTheme } from '../../theme'

export interface FieldErrorProps {
  children: React.ReactNode
  id?: string
}

export const FieldError = ({ children, id }: FieldErrorProps) => {
  const { theme } = useTheme();

  return (
    <html.div style={styles.root}>
      <html.span style={[styles.icon]} aria-hidden={true}>
        <ErrorFilled color={theme.colors.colorSurfaceDestructiveElevated} />
      </html.span>
      <html.span id={id} style={styles.text}>
        {children}
      </html.span>
    </html.div>
  )
}

FieldError.displayName = 'FieldError'
