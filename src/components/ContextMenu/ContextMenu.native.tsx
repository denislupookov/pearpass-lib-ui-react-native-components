import React from 'react'
import { NativeBottomSheet, NativeBottomSheetProps } from '../NativeBottomSheet'

export type ContextMenuProps = NativeBottomSheetProps

export const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, children, testID, onOpenChange, open, openOnLongPress }) => {
  // TS workaround: some build/JSX resolutions treat `NativeBottomSheet` as having no props.
  // Casting keeps runtime behavior identical while unblocking the TS compile.
  const BottomSheetComponent = NativeBottomSheet as unknown as React.ComponentType<ContextMenuProps>

  return (
    <BottomSheetComponent
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      testID={testID}
      openOnLongPress={openOnLongPress}
    >
      {children}
    </BottomSheetComponent>
  )
}

ContextMenu.displayName = 'ContextMenu'
