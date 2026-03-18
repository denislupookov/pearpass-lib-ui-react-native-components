import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { View, Pressable, StyleSheet } from 'react-native'
/**
 * @param {{
 *   children: import('react').ReactNode,
 *   leftIcon?: import('react').ElementType,
 *   rightIcon?: import('react').ElementType,
 *   onPress?: () => void,
 *   variant?: 'primary' | 'secondary',
 *   stretch?: boolean,
 *   disabled?: boolean,
 *   layout?: 'spaced' | 'grouped',
 *   customBorderRadius?: number,
 *   customPadding?: number,
 *   style?: import('react-native').ViewStyle | import('react-native').ViewStyle[],
 *   iconColor?: string
 * }} props
 */
export const ButtonUniversal = ({
  children,
  leftIcon,
  rightIcon,
  onPress,
  variant = 'primary',
  stretch = false,
  disabled = false,
  layout = 'spaced',
  customBorderRadius = 10,
  customPadding = 10,
  style,
  iconColor
}) => {
  const LeftIcon = leftIcon
  const RightIcon = rightIcon

  const buttonStyle = [
    styles.button,
    {
      borderRadius: customBorderRadius,
      padding: customPadding,
      width: stretch ? '100%' : 'auto',
      alignSelf: stretch ? 'stretch' : 'flex-start'
    },
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    disabled && styles.buttonDisabled,
    style
  ]

  const getIconColor = () => {
    if (iconColor) return iconColor
    return variant === 'primary'
      ? colors.black?.mode1
      : colors.primary400?.mode1
  }

  const renderSpacedLayout = () => (
    <View style={styles.spacedContainer}>
      <View style={styles.leftSection}>
        {LeftIcon && <LeftIcon size="21" color={getIconColor()} />}
      </View>

      <View style={styles.centerSection}>{children}</View>

      <View style={styles.rightSection}>
        {RightIcon && <RightIcon size="21" color={getIconColor()} />}
      </View>
    </View>
  )

  const renderGroupedLayout = () => (
    <View style={styles.groupedContainer}>
      {LeftIcon && <LeftIcon size="21" color={getIconColor()} />}
      {children}
      {RightIcon && <RightIcon size="21" color={getIconColor()} />}
    </View>
  )

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !disabled && styles.buttonPressed
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      {layout === 'spaced' ? renderSpacedLayout() : renderGroupedLayout()}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44
  },

  buttonPrimary: {
    backgroundColor: colors.primary400?.mode1,
    borderColor: colors.primary400?.mode1
  },
  buttonSecondary: {
    backgroundColor: colors.black?.mode1,
    borderColor: colors.primary400?.mode1
  },

  buttonDisabled: {
    opacity: 0.6
  },
  buttonPressed: {
    opacity: 0.8
  },

  spacedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  leftSection: {
    width: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightSection: {
    width: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }
})
