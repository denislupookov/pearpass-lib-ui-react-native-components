import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, StyleSheet } from 'react-native'

/**
 * @param {{
 * children: ReactNode
 * isDisabled: boolean
 * }} props
 */
export const CompoundField = ({ children, isDisabled }) => (
  <Pressable style={[styles.container, isDisabled && styles.disabled]}>
    {children}
  </Pressable>
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey100?.mode1,
    backgroundColor: colors.grey400?.mode1
  },
  disabled: {
    opacity: 0.6
  }
})
