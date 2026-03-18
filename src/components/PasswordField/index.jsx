import { useCallback, useState } from 'react'

import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import {
  checkPassphraseStrength,
  checkPasswordStrength
} from '@tetherto/pearpass-utils-password-check'
import { View, Text, StyleSheet } from 'react-native'

import { EyeClosedIcon } from '../../icons/EyeClosedIcon'
import { EyeIcon } from '../../icons/EyeIcon'
import { KeyIcon } from '../../icons/KeyIcon'
import { OkayIcon } from '../../icons/OkayIcon'
import { YellowErrorIcon } from '../../icons/YellowErrorIcon'
import { ButtonLittle } from '../ButtonLittle'
import { InputField } from '../InputField'

/**
 *
 * @param {{
 *  value: string,
 *  onChange: (e: any) => void,
 *  label: string,
 *  error: string,
 *  passType: 'password' | 'passphrase',
 *  additionalItems: any,
 *  placeholder: string,
 *  isDisabled: boolean,
 *  onClick: () => void,
 *  isLast: boolean,
 *  isFirst: boolean,
 *  hasStrongness: boolean,
 *  index: number,
 *  onFocus?: () => void,
 *  onBlur?: () => void,
 *  onInputLayout?: (event: any) => void,
 *  focusedIndex: number,
 *  type?: 'numeric' | 'default',
 * }} props
 */
export const PasswordField = ({
  value,
  onChange,
  label,
  error,
  passType = 'password',
  additionalItems,
  placeholder,
  isDisabled,
  onClick,
  isLast = false,
  isFirst = false,
  hasStrongness = false,
  index,
  onFocus,
  onBlur,
  onInputLayout,
  focusedIndex,
  type = 'default'
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isColored = isPasswordVisible && !isFocused && !!value.length

  const handleChange = (e) => {
    onChange?.(e)
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const getPasswordStrongeness = useCallback(() => {
    const res =
      passType === 'password'
        ? checkPasswordStrength(value)
        : checkPassphraseStrength(value)

    if (res.isSafe) {
      return (
        <View style={styles.passwordStrongnessWrapper}>
          <OkayIcon />
          <Text style={[styles.passwordText, styles.strongPassword]}>
            Strong
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.passwordStrongnessWrapper}>
        <YellowErrorIcon />
        <Text style={[styles.passwordText, styles.weakPassword]}>Weak</Text>
      </View>
    )
  }, [value, passType])

  return (
    <View>
      <InputField
        label={label || 'Password'}
        variant="outline"
        icon={KeyIcon}
        isDisabled={isDisabled}
        value={value}
        onChange={handleChange}
        onClick={onClick}
        placeholder={placeholder}
        error={error}
        isLast={isLast}
        isFirst={isFirst}
        index={index}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInputLayout={onInputLayout}
        focusedIndex={focusedIndex}
        isColored={isColored}
        type={type}
        additionalItems={
          <>
            {!!hasStrongness && getPasswordStrongeness()}
            {!!additionalItems && additionalItems}
            <ButtonLittle
              variant="secondary"
              borderRadius="md"
              startIcon={isPasswordVisible ? EyeClosedIcon : EyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </>
        }
        isSecure={!isPasswordVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  passwordStrongnessWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    gap: 5
  },
  passwordText: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '500'
  },
  strongPassword: {
    color: colors.primary400?.mode1
  },
  weakPassword: {
    color: colors.errorYellow?.mode1
  }
})
