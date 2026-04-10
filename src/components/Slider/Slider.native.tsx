import React from 'react'
import {
  findNodeHandle,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  UIManager,
  View
} from 'react-native'

import { darkTheme } from '../../theme/themes/dark'
import { SliderProps } from './types'
import {
  clamp,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_STEP,
  roundToStep,
  THUMB_SIZE
} from './Slider.utils'

export const Slider = React.forwardRef<View, SliderProps>(function Slider(
  {
    value,
    minimumValue = DEFAULT_MIN,
    maximumValue = DEFAULT_MAX,
    step = DEFAULT_STEP,
    disabled = false,
    minimumTrackTintColor = darkTheme.colors.colorPrimary,
    maximumTrackTintColor = darkTheme.colors.colorSurfaceElevatedOnInteraction,
    thumbTintColor = darkTheme.colors.colorPrimary,
    onValueChange,
    testID,
    'aria-label': ariaLabel
  },
  ref
) {
  const [trackWidth, setTrackWidth] = React.useState(0)
  const sliderRef = React.useRef<View | null>(null)
  const trackPageXRef = React.useRef(0)
  const lastEmittedValueRef = React.useRef(clamp(value, minimumValue, maximumValue))
  const valueRange = Math.max(maximumValue - minimumValue, 1)
  const normalizedValue = clamp(value, minimumValue, maximumValue)
  const ratio = (normalizedValue - minimumValue) / valueRange
  const activeWidth = trackWidth * ratio
  const thumbLeft = clamp(
    activeWidth - THUMB_SIZE / 2,
    0,
    Math.max(trackWidth - THUMB_SIZE, 0)
  )

  React.useEffect(() => {
    lastEmittedValueRef.current = normalizedValue
  }, [normalizedValue])

  const setSliderRef = React.useCallback(
    (node: View | null) => {
      sliderRef.current = node

      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  const measureTrack = React.useCallback(() => {
    const handle = findNodeHandle(sliderRef.current)

    if (!handle) {
      return
    }

    UIManager.measureInWindow(handle, (x, _y, width) => {
      trackPageXRef.current = x

      if (width > 0 && width !== trackWidth) {
        setTrackWidth(width)
      }
    })
  }, [trackWidth])

  const emitValue = React.useCallback(
    (nextValue: number) => {
      if (lastEmittedValueRef.current === nextValue) {
        return
      }

      lastEmittedValueRef.current = nextValue
      onValueChange?.(nextValue)
    },
    [onValueChange]
  )

  const updateFromLocation = React.useCallback(
    (pageX: number) => {
      if (disabled || trackWidth <= 0) {
        return
      }

      const nextRatio = clamp((pageX - trackPageXRef.current) / trackWidth, 0, 1)
      const nextValue = minimumValue + nextRatio * valueRange

      emitValue(
        roundToStep(nextValue, minimumValue, maximumValue, step)
      )
    },
    [
      disabled,
      emitValue,
      maximumValue,
      minimumValue,
      step,
      trackWidth,
      valueRange
    ]
  )

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: (_event, gestureState) =>
          !disabled && Math.abs(gestureState.dx) > 1,
        onPanResponderGrant: (event) => {
          measureTrack()
          updateFromLocation(event.nativeEvent.pageX)
        },
        onPanResponderMove: (_event, gestureState) => {
          updateFromLocation(gestureState.moveX)
        }
      }),
    [disabled, measureTrack, updateFromLocation]
  )

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width)
    requestAnimationFrame(measureTrack)
  }

  return (
    <View
      ref={setSliderRef}
      testID={testID}
      accessibilityRole="adjustable"
      accessibilityLabel={ariaLabel}
      accessibilityState={{ disabled }}
      accessibilityValue={{
        min: minimumValue,
        max: maximumValue,
        now: normalizedValue
      }}
      style={[styles.root, disabled && styles.rootDisabled]}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: maximumTrackTintColor }
        ]}
      />
      <View
        style={[
          styles.activeTrack,
          {
            width: activeWidth,
            backgroundColor: minimumTrackTintColor
          }
        ]}
      />
      <View
        style={[
          styles.thumb,
          {
            left: thumbLeft,
            backgroundColor: thumbTintColor
          }
        ]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 24,
    position: 'relative',
    justifyContent: 'center'
  },
  rootDisabled: {
    opacity: 0.5
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 999
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 999
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 999
  }
})

Slider.displayName = 'Slider'
