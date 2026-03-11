import { styles } from './ToggleSwitch.styles'
import { ToggleSwitchState } from './types'

export const railStateStyleMap = {
  checked: styles.railChecked,
  unchecked: styles.railUnchecked
} satisfies Record<ToggleSwitchState, (typeof styles)[keyof typeof styles]>

export const knobStateStyleMap = {
  checked: styles.knobChecked,
  unchecked: styles.knobUnchecked
} satisfies Record<ToggleSwitchState, (typeof styles)[keyof typeof styles]>
