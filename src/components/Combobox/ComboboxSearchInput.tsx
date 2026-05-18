import React from 'react'
import { InputField } from '../InputField'

export type ComboboxSearchInputProps = {
  placeholder?: string
  value: string
  onChangeText: (value: string) => void
}

export const ComboboxSearchInput = ({ placeholder, value, onChangeText }: ComboboxSearchInputProps): React.ReactElement => {
  return (
    <InputField
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  )
}
