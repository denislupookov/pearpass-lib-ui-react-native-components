import React from 'react'

export type NativeBottomSheetProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = () => {
  throw new Error('NativeBottomSheet is not supported on web')
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
