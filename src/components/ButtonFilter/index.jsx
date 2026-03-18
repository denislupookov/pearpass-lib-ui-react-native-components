import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *   children: import('react').ReactNode,
 *   startIcon?: import('react').ElementType,
 *   variant?: 'primary' | 'secondary',
 *   isDisabled?: boolean,
 *   onPress?: () => void
 * }} props
 */

export const ButtonFilter = ({
  children,
  startIcon,
  variant = 'primary',
  isDisabled = false,
  onPress
}) => {
  const Icon = startIcon

  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    isDisabled && styles.disabled
  ]

  const textStyle = [
    styles.buttonText,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText
  ]

  return (
    <Pressable style={buttonStyle} onPress={isDisabled ? undefined : onPress}>
      {Icon && (
        <Icon
          size="21"
          color={
            variant === 'primary'
              ? colors.secondary400?.mode1
              : colors.white?.mode1
          }
        />
      )}
      {children && <Text style={textStyle}>{children}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    padding: 4,
    borderRadius: 5
  },
  primaryButton: {
    backgroundColor: colors.secondary200?.mode1
  },
  secondaryButton: {
    borderRadius: 10,
    backgroundColor: colors.grey500?.mode1,
    padding: 10
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.secondary200?.mode1
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400'
  },
  primaryText: {
    color: colors.secondary400?.mode1
  },
  secondaryText: {
    color: colors.white?.mode1
  }
})
