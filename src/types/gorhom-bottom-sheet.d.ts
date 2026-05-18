declare module '@gorhom/bottom-sheet' {
  import * as React from 'react'

  export type BottomSheetBackdropProps = {
    [key: string]: unknown
  }

  // The library uses these components as JSX elements and also for `useRef` typing.
  export const BottomSheetBackdrop: React.ComponentType<BottomSheetBackdropProps>

  export type BottomSheetModalProps = {
    [key: string]: unknown
  }

  export class BottomSheetModal extends React.Component<BottomSheetModalProps> {
    present(): void
  }

  export const BottomSheetView: React.ComponentType<Record<string, unknown>>
  export const BottomSheetScrollView: React.ComponentType<Record<string, unknown>>
  export const BottomSheetTextInput: React.ComponentType<Record<string, unknown>>
}

