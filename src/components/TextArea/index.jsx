import { useState } from 'react'

import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Pressable, TextInput } from 'react-native'
/**
 * @param {{
 *   value: string,
 *   onChange?: (text: string) => void,
 *   placeholder?: string,
 *   isDisabled?: boolean,
 *   onClick?: () => void,
 * }} props
 */

export const TextArea = ({
  value,
  onChange,
  placeholder,
  isDisabled,
  onClick
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChangeText = (text) => {
    if (isDisabled) {
      return
    }
    onChange?.(text)
  }

  const handleClick = () => {
    onClick?.()
  }

  const textAreaStyles = {
    width: '100%',
    height: 233,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isFocused ? colors?.primary400?.mode1 : colors?.grey100?.mode1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: colors?.grey400?.mode1,
    color: colors?.white?.mode1,
    textAlignVertical: 'top'
  }

  return (
    <Pressable onPress={handleClick} disabled={isDisabled}>
      <TextInput
        style={textAreaStyles}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors?.grey100?.mode1}
        editable={!isDisabled}
        multiline={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        pointerEvents={isDisabled ? 'none' : 'auto'}
      />
    </Pressable>
  )
}
