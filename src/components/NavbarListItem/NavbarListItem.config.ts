import { styles } from './NavbarListItem.styles'
import type { NavbarListItemSize, NavbarListItemVariant } from './types'

export const ICON_SIZE = 16

export const variantStyleMap = {
  default: styles.variantDefault,
  secondary: styles.variantSecondary,
  destructive: styles.variantDestructive
} satisfies Record<NavbarListItemVariant, (typeof styles)[keyof typeof styles]>

export const sizeStyleMap = {
  small: styles.sizeSmall,
  big: styles.sizeBig
} satisfies Record<NavbarListItemSize, (typeof styles)[keyof typeof styles]>
