import React from 'react'

import { styles } from './Slider.styles'
import { SliderProps } from './types'
import {
  clamp,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_STEP,
  mergeStyle,
  roundToStep,
  THUMB_SIZE
} from './Slider.utils'

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    {
      value,
      minimumValue = DEFAULT_MIN,
      maximumValue = DEFAULT_MAX,
      step = DEFAULT_STEP,
      disabled = false,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      onValueChange,
      testID,
      'aria-label': ariaLabel
    },
    ref
  ) {
    const sliderRef = React.useRef<HTMLDivElement | null>(null)
    const valueRange = Math.max(maximumValue - minimumValue, 1)
    const normalizedValue = clamp(value, minimumValue, maximumValue)
    const ratio = (normalizedValue - minimumValue) / valueRange
    const activeWidth = `${ratio * 100}%`
    const thumbLeft = `calc(${activeWidth} - ${THUMB_SIZE / 2}px)`

    React.useImperativeHandle(ref, () => sliderRef.current!, [])

    const updateFromClientX = React.useCallback(
      (clientX: number) => {
        const rect = sliderRef.current?.getBoundingClientRect()

        if (!rect || rect.width <= 0) {
          return
        }

        const nextRatio = clamp((clientX - rect.left) / rect.width, 0, 1)
        const nextValue = minimumValue + nextRatio * valueRange

        onValueChange?.(
          roundToStep(nextValue, minimumValue, maximumValue, step)
        )
      },
      [maximumValue, minimumValue, onValueChange, step, valueRange]
    )

    const stopDragRef = React.useRef<(() => void) | null>(null)

    const startDrag = React.useCallback(
      (clientX: number) => {
        if (disabled) {
          return
        }

        updateFromClientX(clientX)

        const handleMouseMove = (event: MouseEvent) => {
          updateFromClientX(event.clientX)
        }

        const handleTouchMove = (event: TouchEvent) => {
          const touch = event.touches[0]

          if (touch) {
            updateFromClientX(touch.clientX)
          }
        }

        const stopDrag = () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseup', stopDrag)
          window.removeEventListener('touchmove', handleTouchMove)
          window.removeEventListener('touchend', stopDrag)
          stopDragRef.current = null
        }

        stopDragRef.current = stopDrag

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', stopDrag)
        window.addEventListener('touchmove', handleTouchMove)
        window.addEventListener('touchend', stopDrag)
      },
      [disabled, updateFromClientX]
    )

    React.useEffect(
      () => () => {
        stopDragRef.current?.()
      },
      []
    )

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        onValueChange?.(
          roundToStep(
            normalizedValue - step,
            minimumValue,
            maximumValue,
            step
          )
        )
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        onValueChange?.(
          roundToStep(
            normalizedValue + step,
            minimumValue,
            maximumValue,
            step
          )
        )
      }

      if (event.key === 'Home') {
        event.preventDefault()
        onValueChange?.(minimumValue)
      }

      if (event.key === 'End') {
        event.preventDefault()
        onValueChange?.(maximumValue)
      }
    }

    return (
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        aria-valuemin={minimumValue}
        aria-valuemax={maximumValue}
        aria-valuenow={normalizedValue}
        data-testid={testID}
        style={mergeStyle(
          styles.root,
          disabled ? styles.rootDisabled : undefined
        )}
        onKeyDown={handleKeyDown}
        onMouseDown={(event) => startDrag(event.clientX)}
        onTouchStart={(event) => {
          const touch = event.touches[0]

          if (touch) {
            startDrag(touch.clientX)
          }
        }}
      >
        <div
          style={mergeStyle(
            styles.track,
            maximumTrackTintColor
              ? { backgroundColor: maximumTrackTintColor }
              : undefined
          )}
        />
        <div
          style={mergeStyle(styles.activeTrack, {
            width: activeWidth,
            ...(minimumTrackTintColor
              ? { backgroundColor: minimumTrackTintColor }
              : null)
          })}
        />
        <div
          style={mergeStyle(styles.thumb, {
            left: thumbLeft,
            ...(thumbTintColor ? { backgroundColor: thumbTintColor } : null)
          })}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
