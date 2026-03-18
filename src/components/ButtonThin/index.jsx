import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  onPress: () => void
 * }} props
 */
export const ButtonThin = ({ children, startIcon, onPress }) => {
  const Icon = startIcon
  return (
    <Pressable style={styles.button} activeOpacity={0.8} onPress={onPress}>
      {Icon && <Icon size="21" color={colors.primary400?.mode1 || '#BADE5B'} />}
      {children && <Text style={styles.buttonText}>{children}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    backgroundColor: colors.black?.mode1,
    borderWidth: 1,
    borderColor: colors.black?.mode1
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: colors.primary400?.mode1
  }
})
