export type SliderProps = {
  value: number
  minimumValue?: number
  maximumValue?: number
  step?: number
  disabled?: boolean
  minimumTrackTintColor?: string
  maximumTrackTintColor?: string
  thumbTintColor?: string
  onValueChange?: (value: number) => void
  testID?: string
  'aria-label'?: string
}
