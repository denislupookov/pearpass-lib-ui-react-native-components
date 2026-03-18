import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { View, Pressable, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  onPress: () => void
 * }} props
 */
export const ButtonCreate = ({ children, startIcon, onPress }) => {
  const Icon = startIcon
  return (
    <Pressable style={styles.button} activeOpacity={0.8} onPress={onPress}>
      {Icon && <Icon size="21" color={colors.black.mode1} />}
      {children && <Text style={styles.buttonText}>{children}</Text>}
      <View />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: colors.primary400?.mode1
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '400',
    color: colors.black?.mode1
  }
})
