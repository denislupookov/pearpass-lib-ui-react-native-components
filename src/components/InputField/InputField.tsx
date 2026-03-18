import React from 'react';
import { html } from 'react-strict-dom';
import { styles, variantContainerStyleMap } from './InputField.styles';
import { FieldError } from '../FieldError/FieldError';
import { Text } from '../Text/Text';
import { InputFieldProps } from './types';
import { AnimatedContainer, NATIVE_ANIMATED } from './AnimatedContainer';

export const InputField = (props: InputFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholderText,
    onChangeText,
    variant = 'default',
    errorMessage,
    inputType = 'text',
    rightSlot,
    isGrouped,
    testID,
    inputRef,
    onFocus,
    onBlur,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <html.div style={styles.wrapper} data-testid={testID}>
      <AnimatedContainer isFocused={isFocused} isError={variant === 'error'}>
        <html.div style={[
          variantContainerStyleMap[variant],
          isGrouped && styles.containerGrouped,
          isFocused && variant !== 'error' && styles.containerFocused,
          NATIVE_ANIMATED && styles.containerNativeAnimated,
        ]}>
          <html.div style={styles.innerColumn}>
            <Text variant="label" style={styles.label}>{label}</Text>
            <html.input
              ref={inputRef}
              type={inputType}
              value={value}
              placeholder={placeholderText}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={styles.input}
            />
          </html.div>
          {rightSlot && (
            <html.div style={styles.rightSlotContainer}>
              {rightSlot}
            </html.div>
          )}
        </html.div>
      </AnimatedContainer>
      {errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </html.div>
  );
};

InputField.displayName = 'InputField';
