import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { View, Pressable } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { useTheme } from '../../theme/ThemeContext'

export type NativeBottomSheetProps = {
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  testID?: string
}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
  testID
}) => {
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const isControlled = open !== undefined

  const backgroundStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary
  }), [theme])

  const handleIndicatorStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorBorderPrimary
  }), [theme])

  const handleOpen = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true)
      return
    }

    bottomSheetRef.current?.present()
    onOpenChange?.(true)
  }, [isControlled, onOpenChange])

  const handleDismiss = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  useEffect(() => {
    if (!isControlled) {
      return
    }

    if (open) {
      bottomSheetRef.current?.present()
      return
    }

    ;(bottomSheetRef.current as unknown as BottomSheetModalMethods | null)?.dismiss()
  }, [isControlled, open])

  return (
    <View testID={testID}>
      {trigger ? (
        <Pressable onPress={handleOpen}>
          <View pointerEvents="none">{trigger}</View>
        </Pressable>
      ) : null}

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleIndicatorStyle}
        onDismiss={handleDismiss}
      >
        {children}
      </BottomSheetModal>
    </View>
  )
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
