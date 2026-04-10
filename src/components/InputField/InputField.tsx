import React from 'react';
import { html } from 'react-strict-dom';
import { styles, variantContainerStyleMap } from './InputField.styles';
import { FieldError } from '../FieldError/FieldError';
import { Text } from '../Text/Text';
import { Button } from '../Button';
import { ContentCopy } from '../../icons';
import { useTheme } from '../../theme';
import { InputFieldProps } from './types';
import { AnimatedContainer, NATIVE_ANIMATED } from './AnimatedContainer';

export const InputField = (props: InputFieldProps): React.ReactElement => {
  const {
    label,
    name,
    value,
    placeholder,
    placeholderText,
    onChange,
    onChangeText,
    error,
    errorMessage,
    variant,
    inputType = 'text',
    leftSlot,
    rightSlot,
    disabled = false,
    readOnly = false,
    isGrouped,
    testID,
    inputRef,
    copyable = false,
    onCopy,
    onFocus,
    onBlur,
  } = props;

  const resolvedError = error ?? errorMessage;
  const resolvedVariant = resolvedError ? 'error' : (variant ?? 'default');
  const resolvedPlaceholder = placeholder ?? placeholderText;

  const internalInputRef = React.useRef<HTMLInputElement | null>(null);
  const resolvedInputRef = inputRef ?? internalInputRef;

  const { theme } = useTheme();

  const handleCopy = () => onCopy?.(value);

  const handleLabelClick = () => resolvedInputRef.current?.focus();
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
      <AnimatedContainer isFocused={isFocused} isError={resolvedVariant === 'error'} isGrouped={isGrouped}>
        <html.div style={[
          variantContainerStyleMap[resolvedVariant],
          isGrouped && styles.containerGrouped,
          isFocused && resolvedVariant !== 'error' && styles.containerFocused,
          disabled && styles.containerDisabled,
          NATIVE_ANIMATED && styles.containerNativeAnimated,
        ]}>
          {leftSlot && (
            <html.div style={styles.leftSlotContainer}>
              {leftSlot}
            </html.div>
          )}
          <html.div style={styles.innerColumn}>
            <Text variant="label" style={styles.label} onClick={handleLabelClick}>{label}</Text>
            <html.input
              ref={resolvedInputRef}
              type={inputType}
              name={name}
              value={value}
              placeholder={resolvedPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(e);
                onChangeText?.(e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[styles.input, disabled && styles.containerDisabled]}
            />
          </html.div>
          {(rightSlot || copyable) && (
            <html.div style={[styles.rightSlotContainer]}>
              {rightSlot}
              {copyable && (
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={handleCopy}
                  aria-label="Copy to clipboard"
                  iconBefore={<ContentCopy color={theme.colors.colorTextPrimary} />}
                />
              )}
            </html.div>
          )}
        </html.div>
      </AnimatedContainer>
      {resolvedError && (
        <FieldError>{resolvedError}</FieldError>
      )}
    </html.div>
  );
};

InputField.displayName = 'InputField';
