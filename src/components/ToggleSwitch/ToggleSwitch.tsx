import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './ToggleSwitch.styles'
import { railStateStyleMap, knobStateStyleMap } from './ToggleSwitch.config'
import { Text } from '../Text'

type HtmlDivProps = React.ComponentProps<typeof html.div>

export type ToggleSwitchProps = Omit<HtmlDivProps, 'children'> & {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  'aria-label'?: string
}

export const ToggleSwitch = React.forwardRef<HTMLDivElement, ToggleSwitchProps>(
  function ToggleSwitch(
    {
      checked = false,
      onChange,
      label,
      description,
      disabled = false,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    const handleToggle = () => {
      if (!disabled && onChange) {
        onChange(!checked)
      }
    }

    const hasDetails = Boolean(label) || Boolean(description)
    const railStateStyle = railStateStyleMap[checked ? 'checked' : 'unchecked']
    const knobStateStyle = knobStateStyleMap[checked ? 'checked' : 'unchecked']
    const disabledStyle = disabled ? styles.railDisabled : null

    return (
      <html.div {...rest} ref={ref} style={styles.root}>
        {hasDetails && (
          <html.div style={styles.details}>
            {label && <Text>{label}</Text>}
            {description && (
              <Text variant="caption" style={styles.description}>
                {description}
              </Text>
            )}
          </html.div>
        )}

        <html.button
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel ?? label}
          disabled={disabled}
          onClick={disabled ? undefined : handleToggle}
          style={[styles.rail, railStateStyle, disabledStyle]}
        >
          <html.div style={[styles.knob, knobStateStyle]} />
        </html.button>
      </html.div>
    )
  }
)

ToggleSwitch.displayName = 'ToggleSwitch'
