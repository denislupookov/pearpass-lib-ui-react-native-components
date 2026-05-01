import React, { useState } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './ListItem.styles'
import { ICON_SIZE, variantStyleMap } from './ListItem.config'
import { ListItemSubtitle, ListItemSubtitleLayout, ListItemPlatform, ListItemVariant, ListItemIconAlign, ListItemSelectionMode } from './types'
import { Text, TextProps } from '../Text'
import { Checkbox } from '../Checkbox'
import { Pressable, PressableProps } from '../Pressable'
import { withIconSize, defaultPlatform } from '../../utils'

export type ListItemProps = {
  icon?: React.ReactNode
  iconSize?: number
  title: string
  subtitle?: ListItemSubtitle
  subtitleLayout?: ListItemSubtitleLayout
  rightElement?: React.ReactNode
  platform?: ListItemPlatform
  selected?: boolean
  showDivider?: boolean
  dividerColor?: string
  variant?: ListItemVariant
  iconAlign?: ListItemIconAlign
  selectionMode?: ListItemSelectionMode
  isSelected?: boolean
  onSelect?: () => void
  onClick?: () => void
  onLongPress?: () => void
  delayLongPress?: number
  titleStyle?: TextProps['style']
  subtitleStyle?: TextProps['style']
  testID?: string
  style?: PressableProps['style']
  withRoundedBottomBorders?: boolean
  withRoundedTopBorders?: boolean
  withRoundedBorders?: boolean
  selectable?: boolean
  isCheckboxSelectable?: boolean
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem(
    {
      icon,
      iconSize = ICON_SIZE,
      title,
      subtitle,
      subtitleLayout = 'horizontal',
      rightElement,
      platform = defaultPlatform,
      selected = false,
      showDivider = false,
      dividerColor,
      variant = 'default',
      iconAlign = 'center',
      selectionMode = 'none',
      isSelected = false,
      onSelect,
      onClick,
      onLongPress,
      delayLongPress,
      titleStyle,
      subtitleStyle,
      testID,
      style: userStyle,
      withRoundedBottomBorders = true,
      withRoundedTopBorders = true,
      withRoundedBorders = true,
      selectable = true,
      isCheckboxSelectable = true,
    },
    ref
  ) {
    const [isPressed, setIsPressed] = useState(false)

    const handlePress = () => {
      if (selectionMode === 'multi') {
        onSelect?.()
      } else {
        onClick?.()
      }
    }

    const renderSubtitle = () => {
      if (!subtitle) return null

      if (typeof subtitle === 'string') {
        return <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      }

      if (subtitleLayout === 'vertical') {
        return (
          <html.div style={styles.subtitleDividerContainerVertical}>
            <Text style={[styles.subtitleSegment, subtitleStyle]}>{subtitle.primary}</Text>
            <html.div style={styles.dividerLineHorizontal} />
            <Text style={[styles.subtitleSegment, subtitleStyle]}>{subtitle.secondary}</Text>
          </html.div>
        )
      }

      return (
        <html.div style={styles.subtitleDividerContainer}>
          <Text style={[styles.subtitleSegment, subtitleStyle]}>{subtitle.primary}</Text>
          <html.div style={styles.dividerLine} />
          <Text style={[styles.subtitleSegment, subtitleStyle]}>{subtitle.secondary}</Text>
        </html.div>
      )
    }

    return (
      <Pressable
        ref={ref}
        data-testid={testID}
        onClick={handlePress}
        onLongPress={selectionMode !== 'multi' ? onLongPress : undefined}
        delayLongPress={delayLongPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={
          [
            styles.root,
            selectable && styles.selectable,
            platform === 'mobile' && styles.mobile,
            selected && styles.selected,
            isPressed && styles.pressed,
            showDivider && styles.showDivider,
            variantStyleMap[variant],
            userStyle,
            withRoundedBottomBorders === false && styles.containerFlatBottom,
            withRoundedTopBorders === false && styles.containerFlatTop,
            withRoundedBorders === false && [styles.containerFlatTop, styles.containerFlatBottom],
            dividerColor && styles.dividerBorderBottomColor(dividerColor)
          ] as PressableProps['style']
        }
      >
        {selectionMode === 'multi' && (
          <Checkbox checked={isSelected} onChange={onSelect} isCheckboxSelectable={isCheckboxSelectable}/>
        )}

        {icon && (
          <html.span
            style={[styles.iconContainer, styles.iconSize(iconSize), iconAlign === 'top' && styles.iconAlignTop]}
            aria-hidden={true}
          >
            {withIconSize(icon, iconSize)}
          </html.span>
        )}

        <html.div style={styles.content}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {renderSubtitle()}
        </html.div>

        {rightElement && (
          <html.div style={styles.rightContainer}>{rightElement}</html.div>
        )}
      </Pressable>
    )
  }
)

ListItem.displayName = 'ListItem'
