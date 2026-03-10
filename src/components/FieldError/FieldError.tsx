import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './FieldError.styles'
import { ErrorFilled } from '../../icons'

export interface FieldErrorProps {
  children: React.ReactNode
  id?: string
}

export const FieldError = ({ children, id }: FieldErrorProps) => {
  return (
    <html.div style={styles.root} role="alert">
      <html.span style={[styles.icon]} aria-hidden={true}>
        <ErrorFilled />
      </html.span>
      <html.span id={id} style={styles.text}>
        {children}
      </html.span>
    </html.div>
  )
}

FieldError.displayName = 'FieldError'
