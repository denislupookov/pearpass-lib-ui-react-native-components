import React, { useCallback, createContext, useEffect, useMemo, useRef, useContext } from 'react'
import { View, Pressable } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { useTheme } from '../../theme/ThemeContext'
import { rawTokens } from '../../theme/tokens.raw'

const BottomSheetCloseContext = createContext<() => void>(() => { })

export const useBottomSheetClose = () => useContext(BottomSheetCloseContext)

export type NativeBottomSheetProps = {
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  testID?: string
  openOnLongPress?: boolean
  keyboardBehavior?: BottomSheetModalProps['keyboardBehavior']
  keyboardBlurBehavior?: BottomSheetModalProps['keyboardBlurBehavior']
  android_keyboardInputMode?: BottomSheetModalProps['android_keyboardInputMode']
}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
  openOnLongPress = false,
  testID,
  keyboardBehavior,
  keyboardBlurBehavior,
  android_keyboardInputMode
}) => {
  const { theme } = useTheme()
  // gorhom doesn't publicly export BottomSheetModalMethods, so any is the only viable ref type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomSheetRef = useRef<any>(null)
  const isControlled = open !== undefined

  const backgroundStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary,
    borderTopLeftRadius: rawTokens.radius16,
    borderTopRightRadius: rawTokens.radius16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.colorSurfaceDisabled
  }), [theme])

  const sheetContainerStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary,
    borderTopLeftRadius: rawTokens.radius16,
    borderTopRightRadius: rawTokens.radius16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.colorSurfaceDisabled,
    overflow: 'hidden' as const
  }), [theme])

  const handlePillStyle = useMemo(() => ({
    width: rawTokens.spacing32,
    height: rawTokens.spacing4,
    borderRadius: rawTokens.spacing8,
    backgroundColor: theme.colors.colorSurfaceElevatedOnInteraction
  }), [theme])

  const isPresentedRef = useRef(false)

  const handleOpen = useCallback(() => {
    isPresentedRef.current = true
    bottomSheetRef.current?.present()
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleDismiss = useCallback(() => {
    isPresentedRef.current = false
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss()
  }, [])

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
      if (!isPresentedRef.current) {
        isPresentedRef.current = true
        bottomSheetRef.current?.present()
      }
      return
    }

    if (isPresentedRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (bottomSheetRef.current as any | null)?.dismiss()
    }
  }, [isControlled, open])

  const triggerElement = openOnLongPress
    ? React.isValidElement(trigger)
      ? React.cloneElement(trigger as React.ReactElement<{ onLongPress?: () => void }>, {
        onLongPress: handleOpen
      })
      : trigger
    : (
      <Pressable onPress={handleOpen}>
        {React.isValidElement(trigger)
          ? React.cloneElement(trigger as React.ReactElement<{ onClick?: () => void }>, {
            onClick: handleOpen
          })
          : trigger}
      </Pressable>
    )

  return (
    <View testID={testID}>
      {trigger ? triggerElement : null}

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode={android_keyboardInputMode}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        backgroundStyle={backgroundStyle}
        handleComponent={null}
      >
        <BottomSheetScrollView>
          <View style={sheetContainerStyle}>
            <View style={{ alignItems: 'center', paddingTop: rawTokens.spacing12, paddingBottom: rawTokens.spacing8 }}>
              <View style={handlePillStyle} />
            </View>
            <BottomSheetCloseContext.Provider value={handleClose}>
              {children}
            </BottomSheetCloseContext.Provider>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  )
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
