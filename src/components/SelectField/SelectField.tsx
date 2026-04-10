import React from 'react';
import { html } from 'react-strict-dom';
import { FieldError } from '../FieldError/FieldError';
import { Text } from '../Text/Text';
import { Button } from '../Button';
import { AnimatedContainer, NATIVE_ANIMATED } from '../InputField/AnimatedContainer';
import { styles as inputStyles, variantContainerStyleMap } from '../InputField/InputField.styles';
import { SelectFieldProps } from './types';

export const SelectField = (props: SelectFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholder,
    onClick,
    error,
    errorMessage,
    variant,
    leftSlot,
    rightSlot,
    disabled = false,
    isGrouped,
    testID,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
  } = props;

  const resolvedError = error ?? errorMessage;
  const resolvedVariant = resolvedError ? 'error' : (variant ?? 'default');
  const hasValue = Boolean(value?.trim().length);
  const displayValue = hasValue ? value : (placeholder ?? '');
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
    <html.div style={inputStyles.wrapper} data-testid={testID}>
      <AnimatedContainer isFocused={isFocused} isError={resolvedVariant === 'error'} isGrouped={isGrouped}>
        <html.button
          type="button"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel ?? label}
          onClick={disabled ? undefined : onClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            inputStyles.selectButton,
            variantContainerStyleMap[resolvedVariant],
            isGrouped && inputStyles.containerGrouped,
            isFocused && resolvedVariant !== 'error' && inputStyles.containerFocused,
            disabled && inputStyles.containerDisabled,
            NATIVE_ANIMATED && inputStyles.containerNativeAnimated,
          ]}
        >
          {leftSlot && (
            <html.div style={inputStyles.leftSlotContainer}>
              {leftSlot}
            </html.div>
          )}

          <html.div style={inputStyles.innerColumn}>
            <Text variant="label" style={inputStyles.label}>{label}</Text>
            <html.span
              style={[
                inputStyles.inputValue,
                !hasValue && inputStyles.inputPlaceholder,
              ]}
            >
              {displayValue}
            </html.span>
          </html.div>

          {rightSlot && (
            <html.div style={inputStyles.rightSlotContainer}>
              <Button
                variant="tertiary"
                size="small"
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
                iconBefore={rightSlot}
                aria-label="Action"
              />
            </html.div>
          )}
        </html.button>
      </AnimatedContainer>

      {resolvedError && (
        <FieldError>{resolvedError}</FieldError>
      )}
    </html.div>
  );
};

SelectField.displayName = 'SelectField';
