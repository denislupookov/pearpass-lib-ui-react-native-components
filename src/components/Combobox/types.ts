import React from 'react'

export type ComboboxItem = {
  id: string
  title: string
  subtitle?: string
  icon?: React.ReactNode
  rightElement?: React.ReactNode
}

export type ComboboxProps = {
  label: string
  title?: string
  value?: string
  placeholder?: string
  onClear?: () => void
  disabled?: boolean
  error?: string
  items: ComboboxItem[]
  selectedId?: string
  onSelect: (id: string) => void
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  emptyText?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** When true (web only), the dropdown menu's height is capped to the
   * available space between the trigger and the viewport bottom edge so it
   * never overflows the window. Content scrolls inside. Default: false. */
  stretch?: boolean
  clearAriaLabel?: string
  closeAriaLabel?: string
  testID?: string
}
