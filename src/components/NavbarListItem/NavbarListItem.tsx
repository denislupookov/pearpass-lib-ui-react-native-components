import React, { useState } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './NavbarListItem.styles'
import {
  variantStyleMap,
  sizeStyleMap,
  ICON_SIZE
} from './NavbarListItem.config'
import type {
  NavbarListItemVariant,
  NavbarListItemPlatform,
  NavbarListItemSize
} from './types'
import { withIconSize, defaultPlatform } from '../../utils'

type HtmlButtonProps = React.ComponentProps<typeof html.button>

export type NavbarListItemProps = Omit<
  HtmlButtonProps,
  'children' | 'onClick'
> & {
  icon?: React.ReactNode
  iconSize?: number
  label?: string
  count?: number
  selected?: boolean
  variant?: NavbarListItemVariant
  size?: NavbarListItemSize
  platform?: NavbarListItemPlatform
  showDivider?: boolean
  onClick?: HtmlButtonProps['onClick']
  testID?: string
  additionalItems?: React.ReactNode
}

const ICON_ONLY_SIZE = ICON_SIZE + 16

type FragmentElementProps = {
  children?: React.ReactNode
}

const flattenIconNodes = (node: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(node).flatMap((child) => {
    if (
      React.isValidElement<FragmentElementProps>(child) &&
      child.type === React.Fragment
    ) {
      return flattenIconNodes(child.props.children)
    }

    return [child]
  })

export const NavbarListItem = React.forwardRef<
  HTMLButtonElement,
  NavbarListItemProps
>(function NavbarListItem(
  {
    icon,
    iconSize = ICON_SIZE,
    label,
    count,
    selected = false,
    variant = 'default',
    size,
    platform = defaultPlatform,
    showDivider = false,
    onClick,
    testID,
    additionalItems,
    ...rest
  },
  ref
) {
  const resolvedSize = size ?? (platform === 'mobile' ? 'big' : 'small')
  const iconNodes = flattenIconNodes(icon)
  const hasIcon = iconNodes.length > 0
  const hasMultipleIcons = iconNodes.length > 1
  const [isPressed, setIsPressed] = useState(false)
  const isIconOnly = hasIcon && !hasMultipleIcons && !label && count === undefined

  return (
    <html.button
      {...rest}
      ref={ref}
      type="button"
      data-testid={testID}
      aria-selected={selected}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      style={[
        styles.root,
        sizeStyleMap[resolvedSize],
        showDivider && styles.divider,
        selected && styles.selected,
        isPressed && styles.pressed,
        variantStyleMap[variant],
        isIconOnly && styles.iconOnly(ICON_ONLY_SIZE)
      ]}
    >
      {hasMultipleIcons && (
        <html.div style={styles.iconGroup} aria-hidden={true}>
          {iconNodes.map((iconNode, index) => (
            <html.div
              key={index}
              style={[
                styles.icon,
                styles.iconSize(iconSize),
                index > 0 && styles.iconGroupItemSpacing
              ]}
            >
              {withIconSize(iconNode, iconSize)}
            </html.div>
          ))}
        </html.div>
      )}

      {!hasMultipleIcons && hasIcon && (
        <html.div
          style={[styles.icon, styles.iconSize(iconSize)]}
          aria-hidden={true}
        >
          {withIconSize(iconNodes[0], iconSize)}
        </html.div>
      )}

      {label && <html.span style={styles.label}>{label}</html.span>}

      {count !== undefined && (
        <html.span style={styles.count} aria-label={`${count} items`}>
          {count}
        </html.span>
      )}

      {additionalItems && (
        <html.span style={styles.additionalItems}>{additionalItems}</html.span>
      )}
    </html.button>
  )
})

NavbarListItem.displayName = 'NavbarListItem'
