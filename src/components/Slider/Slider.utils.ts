import type { CSSProperties } from 'react'

export const DEFAULT_MIN = 0
export const DEFAULT_MAX = 100
export const DEFAULT_STEP = 1
export const THUMB_SIZE = 14

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const mergeStyle = (
  baseStyle: CSSProperties,
  overrides?: CSSProperties
): CSSProperties => ({
  ...baseStyle,
  ...overrides
})

export const roundToStep = (
  value: number,
  minimumValue: number,
  maximumValue: number,
  step: number
) => {
  const steps = Math.round((value - minimumValue) / step)
  const steppedValue = minimumValue + steps * step

  return clamp(Number(steppedValue.toFixed(4)), minimumValue, maximumValue)
}
