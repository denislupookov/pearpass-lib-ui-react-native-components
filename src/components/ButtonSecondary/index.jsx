import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  size?: 'sm' | 'md'
 *  stretch: boolean
 *  onPress: () => void
 *  disabled?: boolean
 * }} props
 */
export const ButtonSecondary = ({
  children,
  onPress,
  size = 'md',
  stretch,
  disabled = false
}) => {
  const buttonStyle = [
    styles.button,
    size === 'sm' ? styles.smallButton : styles.mediumButton,
    stretch && styles.stretchButton,
    disabled && styles.disabledButton
  ]

  const textStyle = [
    styles.buttonText,
    size === 'sm' ? styles.smallText : styles.mediumText
  ]

  return (
    <Pressable
      style={buttonStyle}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    backgroundColor: colors.grey500?.mode1,
    borderColor: colors.primary400?.mode1
  },
  smallButton: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'flex-start',
    width: 'auto'
  },
  mediumButton: {
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'flex-start',
    width: 'auto'
  },
  stretchButton: {
    alignSelf: 'stretch',
    width: '100%'
  },
  disabledButton: {
    opacity: 0.6
  },
  buttonText: {
    color: colors.white?.mode1,
    fontFamily: 'Inter',
    fontStyle: 'normal'
  },
  smallText: {
    fontSize: 12,
    fontWeight: '600'
  },
  mediumText: {
    fontSize: 16,
    fontWeight: '500'
  }
})
