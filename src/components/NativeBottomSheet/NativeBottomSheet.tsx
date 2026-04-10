import React from 'react'

export type NativeBottomSheetProps = {
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  testID?: string
  openOnLongPress?: boolean
}

export const useBottomSheetClose = () => () => {}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = () => {
  throw new Error('NativeBottomSheet is not supported on web')
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
