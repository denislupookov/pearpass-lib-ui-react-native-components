import React from 'react'
import { Pressable as RNPressable, View, ViewStyle } from 'react-native'
import { css } from 'react-strict-dom'
import type { StyleXStyles } from '@stylexjs/stylex'

export type PressableProps = {
  onClick?: () => void
  onLongPress?: () => void
  delayLongPress?: number
  onPressIn?: () => void
  onPressOut?: () => void
  children?: React.ReactNode
  style?: StyleXStyles
  testID?: string
  'data-testid'?: string
}

export const Pressable = React.forwardRef<View, PressableProps>(
  function Pressable({ onClick, onLongPress, delayLongPress, onPressIn, onPressOut, style, testID, 'data-testid': dataTestId, children }, ref) {
    const styleArray = style ? (Array.isArray(style) ? style : [style]) : []
    const { style: resolvedStyle } = css.props(...styleArray)
    return (
      <RNPressable
        ref={ref}
        onPress={onClick}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        testID={testID ?? dataTestId}
        style={resolvedStyle as ViewStyle}
      >
        {children}
      </RNPressable>
    )
  }
)

Pressable.displayName = 'Pressable'
