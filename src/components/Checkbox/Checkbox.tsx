import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './Checkbox.styles'
import { checkboxStateStyleMap } from './Checkbox.config'
import { Text } from '../Text'
import { Check } from '../../icons'
import { useTheme } from '../../theme/ThemeContext'

type HtmlDivProps = React.ComponentProps<typeof html.div>

export type CheckboxProps = Omit<HtmlDivProps, 'children'> & {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  'aria-label'?: string
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(
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

    const { theme } = useTheme()

    const hasDetails = Boolean(label) || Boolean(description)
    const checkboxStateStyle =
      checkboxStateStyleMap[checked ? 'checked' : 'unchecked']
    const disabledStyle = disabled ? styles.checkboxDisabled : null

    return (
      <html.div {...rest} ref={ref} style={styles.root}>
        <html.button
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel ?? label}
          disabled={disabled}
          onClick={disabled ? undefined : handleToggle}
          style={[styles.checkboxBase, checkboxStateStyle, disabledStyle]}
        >
          {checked && (
            <html.span style={styles.checkIconWrapper} aria-hidden={true}>
              <Check width={14} height={14} color={theme.colors.colorOnPrimary} />
            </html.span>
          )}
        </html.button>

        {hasDetails && (
          <html.div
            style={[styles.details, disabled && styles.detailsDisabled]}
            onClick={disabled ? undefined : handleToggle}
          >
            {label && <Text>{label}</Text>}
            {description && (
              <Text variant="caption" style={styles.description}>
                {description}
              </Text>
            )}
          </html.div>
        )}
      </html.div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
