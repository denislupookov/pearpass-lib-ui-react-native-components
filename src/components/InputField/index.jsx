import { useRef, useState } from 'react'

import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

import { ErrorIcon } from '../../icons/ErrorIcon'
import { HighlightString } from '../HighlightString'

/**
 * @param {{
 *  value?: string,
 *  onChange?: (e?: string) => void,
 *  icon?: import('react').FC,
 *  label?: string,
 *  error?: string,
 *  additionalItems?: ReactNode,
 *  placeholder?: string,
 *  isDisabled?: boolean,
 *  isFirst?: boolean,
 *  isLast?: boolean,
 *  focusedIndex?: number,
 *  index?: number,
 *  onFocus?: () => void,
 *  onBlur?: () => void,
 *  onClick?: () => void,
 *  onInputLayout?: (event: any) => void,
 *  type?: 'numeric' | 'default',
 *  isSecure: boolean,
 *  isColored: boolean,
 *  variant?: 'default' | 'outline',
 *  isTransparent: boolean
 * }} props
 */
export const InputField = ({
  value,
  onChange,
  icon,
  label,
  error,
  additionalItems,
  placeholder,
  isDisabled,
  isFirst = false,
  isLast = false,
  onFocus,
  onBlur,
  onInputLayout,
  focusedIndex,
  type = 'default',
  variant = 'default',
  isSecure = false,
  isColored = false,
  onClick,
  index,
  isTransparent = false
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e) => {
    if (isDisabled) return
    onChange?.(e)
  }

  const handleClick = () => {
    inputRef.current?.focus()
    onClick?.()
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const Icon = icon
  const isOutline = variant === 'outline'
  const prevIsFocused = focusedIndex === index - 1

  const getWrapperStyle = () => {
    const baseStyle = [styles.inputWrapper]

    if (isOutline) {
      baseStyle.push(styles.outlineWrapper)
      baseStyle.push({
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: isLast ? 1 : 0,
        borderTopColor:
          isFocused || prevIsFocused
            ? colors.primary400?.mode1
            : colors.grey100?.mode1,
        borderLeftColor: isFocused
          ? colors.primary400?.mode1
          : colors.grey100?.mode1,
        borderRightColor: isFocused
          ? colors.primary400?.mode1
          : colors.grey100?.mode1,
        borderBottomColor: isFocused
          ? colors.primary400?.mode1
          : colors.grey100?.mode1,
        borderTopLeftRadius: isFirst ? 10 : 0,
        borderTopRightRadius: isFirst ? 10 : 0,
        borderBottomLeftRadius: isLast ? 10 : 0,
        borderBottomRightRadius: isLast ? 10 : 0
      })
    } else {
      baseStyle.push(styles.defaultWrapper)
      if (!isFirst) {
        baseStyle.push({
          borderTopWidth: 1,
          borderTopColor: colors.grey100?.mode1
        })
      }
    }

    return baseStyle
  }

  return (
    <Pressable
      style={getWrapperStyle()}
      onPress={handleClick}
      accessible={false}
    >
      {!!icon && (
        <View style={styles.iconWrapper}>
          <Icon size="21" />
        </View>
      )}

      <View style={styles.mainWrapper}>
        <Text style={styles.label}>{label}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleChange}
            placeholder={placeholder}
            placeholderTextColor={colors.grey100?.mode1}
            editable={!isDisabled}
            style={[
              styles.input,
              { color: isTransparent ? 'transparent' : colors.white?.mode1 }
            ]}
            keyboardType={type}
            secureTextEntry={isSecure}
            onLayout={onInputLayout}
            onFocus={handleFocus}
            onBlur={handleBlur}
            accessible
          />

          {isColored && (
            <View style={styles.styledTextContainer} pointerEvents="none">
              <HighlightString
                numberOfLines={1}
                fontWeight={700}
                text={value}
              />
            </View>
          )}
        </View>

        {!!error?.length && (
          <View style={styles.errorMessageWrapper}>
            <ErrorIcon size="10" />
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}
      </View>

      {!!additionalItems && (
        <View style={styles.additionalItems}>{additionalItems}</View>
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
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 10
  },
  outlineWrapper: {
    backgroundColor: colors.grey400?.mode1
  },
  defaultWrapper: {},
  iconWrapper: {
    flexShrink: 0
  },
  mainWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  label: {
    color: colors.white?.mode1,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400'
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    marginTop: 5,
    minHeight: 29
  },
  styledTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden',
    flex: 1
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700'
  },
  errorMessageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2
  },
  errorMessage: {
    color: colors.categoryIdentity?.mode1,
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
