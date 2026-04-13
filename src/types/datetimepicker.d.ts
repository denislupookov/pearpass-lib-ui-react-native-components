declare module '@react-native-community/datetimepicker' {
  import * as React from 'react'

  export type DateTimePickerEvent = {
    type: 'set' | 'dismissed' | 'neutralButtonPressed'
    nativeEvent: { timestamp?: number }
  }

  export type AndroidNativeProps = {
    value: Date
    mode?: 'date' | 'time'
    minimumDate?: Date
    maximumDate?: Date
    is24Hour?: boolean
    onChange?: (event: DateTimePickerEvent, date?: Date) => void
  }

  export const DateTimePickerAndroid: {
    open(params: AndroidNativeProps): void
    dismiss(mode?: 'date' | 'time'): void
  }

  export type DateTimePickerProps = {
    value: Date
    mode?: 'date' | 'time' | 'datetime'
    display?: string
    minimumDate?: Date
    maximumDate?: Date
    locale?: string
    themeVariant?: 'light' | 'dark'
    style?: unknown
    onChange?: (event: DateTimePickerEvent, date?: Date) => void
  }

  const DateTimePicker: React.ComponentType<DateTimePickerProps>
  export default DateTimePicker
}
