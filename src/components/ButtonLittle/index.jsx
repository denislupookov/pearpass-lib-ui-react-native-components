import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *   children: import('react').ReactNode,
 *   startIcon?: import('react').ElementType,
 *   variant?: 'primary' | 'secondary',
 *   borderRadius?: 'sm' | 'lg',
 *   onPress?: () => void
 * }} props
 */
export const ButtonLittle = ({
  children,
  startIcon,
  variant = 'primary',
  borderRadius = 'sm',
  onPress
}) => {
  const Icon = startIcon

  const buttonStyle = [
    styles.button,
    borderRadius === 'sm' ? styles.smallRadius : styles.largeRadius,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton
  ]

  const textStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryText : styles.secondaryText
  ]

  return (
    <Pressable style={buttonStyle} activeOpacity={0.8} onPress={onPress}>
      {Icon && (
        <Icon
          size="21"
          color={
            variant === 'primary'
              ? colors.black?.mode1
              : colors.primary400?.mode1
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
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    borderWidth: 1
  },
  smallRadius: {
    borderRadius: 15,
    padding: 10
  },
  largeRadius: {
    borderRadius: 25,
    padding: 7
  },
  primaryButton: {
    backgroundColor: colors.primary400?.mode1,
    borderColor: colors.primary300?.mode1
  },
  secondaryButton: {
    backgroundColor: colors.black?.mode1,
    borderColor: colors.black?.mode1
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400'
  },
  primaryText: {
    color: colors.black?.mode1
  },
  secondaryText: {
    color: colors.primary400?.mode1
  }
})
