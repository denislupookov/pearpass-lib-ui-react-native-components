import React from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { NativeBottomSheet } from '../NativeBottomSheet'

export type ContextMenuProps = {
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  testID?: string
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
  testID
}) => {
  // TS workaround: some build/JSX resolutions treat `NativeBottomSheet` as having no props.
  // Casting keeps runtime behavior identical while unblocking the TS compile.
  const BottomSheetComponent = NativeBottomSheet as unknown as React.ComponentType<ContextMenuProps>

  return (
    <BottomSheetComponent
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      testID={testID}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetComponent>
  )
}

ContextMenu.displayName = 'ContextMenu'
