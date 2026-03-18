import { useState } from 'react'

import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, TextInput, StyleSheet } from 'react-native'

/**
 * @param {{
 *   value: string,
 *   onChange?: (text: string) => void,
 *   placeholder?: string,
 *   isDisabled?: boolean,
 *   onClick?: () => void
 * }} props
 */
export const TextAreaReport = ({
  value,
  onChange,
  placeholder,
  isDisabled,
  onClick
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChangeText = (text) => {
    if (isDisabled) return
    onChange?.(text)
  }

  const handleClick = () => {
    onClick?.()
  }

  return (
    <Pressable onPress={handleClick}>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.grey100?.mode1}
        editable={!isDisabled}
        multiline={true}
        textAlignVertical="top"
        style={[
          styles.textAreaReport,
          {
            borderColor: isFocused
              ? colors.primary400?.mode1
              : colors.grey100?.mode1
          }
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  textAreaReport: {
    width: '100%',
    height: 70,
    padding: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: colors.white?.mode1
  }
})
