import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './Radio.styles'
import { ringStateStyleMap, ringDisabledStyleMap } from './Radio.config'
import { RadioOption } from './types'

export type RadioProps = {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  builtIn?: boolean
  testID?: string
}

export const Radio = ({
  options,
  value,
  onChange,
  disabled = false,
  builtIn = false,
  testID
}: RadioProps) => {
  return (
    <html.div
      role="radiogroup"
      data-testid={testID}
      style={[styles.root, builtIn && styles.rootBuiltIn]}
    >
      {options.map((option: RadioOption, index: number) => {
        const isChecked = option.value === value
        const isDisabled = disabled || option.disabled === true
        const isNotLast = index < options.length - 1

        return (
          <html.div
            key={option.value}
            role="radio"
            aria-checked={isChecked}
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : 0}
            style={[
              styles.optionWrapper,
              builtIn && styles.optionWrapperBuiltIn,
              isNotLast && styles.optionWrapperDivider,
              isDisabled && styles.optionWrapperDisabled
            ]}
            onClick={isDisabled ? undefined : () => onChange?.(option.value)}
          >
            <html.div
              style={[
                styles.ring,
                ringStateStyleMap[isChecked ? 'checked' : 'unchecked'],
                ringDisabledStyleMap[isDisabled ? 'disabled' : 'enabled']
              ]}
              aria-hidden={true}
            >
              {isChecked && <html.div style={styles.dot} />}
            </html.div>

            {(option.label || option.description) && (
              <html.div style={styles.details}>
                {option.label && (
                  <html.span style={styles.label}>{option.label}</html.span>
                )}
                {option.description && (
                  <html.span style={styles.description}>
                    {option.description}
                  </html.span>
                )}
              </html.div>
            )}
          </html.div>
        )
      })}
    </html.div>
  )
}

Radio.displayName = 'Radio'
