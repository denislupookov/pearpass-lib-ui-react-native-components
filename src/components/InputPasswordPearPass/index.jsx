import { useRef, useState } from 'react'

import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

import { ErrorIcon } from '../../icons/ErrorIcon'
import { EyeClosedIcon } from '../../icons/EyeClosedIcon'
import { EyeIcon } from '../../icons/EyeIcon'
import { LockCircleIcon } from '../../icons/LockCircleIcon'
import { ButtonLittle } from '../ButtonLittle'

/**
 * @param {{
 *  value?: string,
 *  onChange?: (e?: string) => void,
 *  error?: string,
 *  placeholder?: string,
 *  isDisabled?: boolean,
 *  onClick?: () => void,
 *  isPassword: boolean
 * }} props
 */
export const InputPasswordPearPass = ({
  value,
  onChange,
  error,
  placeholder,
  isDisabled,
  isPassword,
  onClick
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(!isPassword)

  const handleChange = (e) => {
    if (isDisabled) return
    onChange?.(e)
  }

  const handleClick = () => {
    inputRef.current?.focus()
    onClick?.()
  }

  const wrapperStyle = [
    styles.inputWrapper,
    {
      borderColor: isFocused ? colors.primary400?.mode1 : colors.grey100?.mode1,
      padding: isPassword ? 5 : 10
    }
  ]

  return (
    <Pressable style={wrapperStyle} onPress={handleClick}>
      {isPassword && (
        <View style={styles.iconWrapper}>
          <LockCircleIcon size="24" />
        </View>
      )}

      <View style={styles.mainWrapper}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.grey100?.mode1}
          editable={!isDisabled}
          secureTextEntry={!isVisible}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {!!error?.length && (
          <View style={styles.errorMessageWrapper}>
            <ErrorIcon size="10" />
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}
      </View>

      {isPassword && (
        <View style={styles.additionalItems}>
          <ButtonLittle
            variant="secondary"
            borderRadius="md"
            onPress={() => setIsVisible(!isVisible)}
            startIcon={isVisible ? EyeClosedIcon : EyeIcon}
          />
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '100%',
    position: 'relative',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.grey400.mode1
  },
  input: {
    color: colors.white?.mode1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  iconWrapper: {
    flexShrink: 0
  },
  mainWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  errorMessageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2
  },
  errorMessage: {
    color: colors.errorRed?.dark,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500'
  },
  additionalItems: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center'
  }
})
