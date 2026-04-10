import React from 'react';
import { html } from 'react-strict-dom';
import { InsertDriveFileOutlined } from '../../icons';
import { useTheme } from '../../theme';
import { FieldError } from '../FieldError/FieldError';
import { Text } from '../Text/Text';
import { AnimatedContainer, NATIVE_ANIMATED } from '../InputField/AnimatedContainer';
import { styles as inputStyles, variantContainerStyleMap } from '../InputField/InputField.styles';
import { styles } from './AttachmentField.styles';
import { AttachmentFieldProps } from './types';

export const AttachmentField = (props: AttachmentFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholder,
    onClick,
    error,
    valueIcon,
    rightSlot,
    disabled = false,
    isGrouped,
    testID,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    errorMessage,
    variant,
  } = props;

  const { theme } = useTheme();
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

  const content = (
    <html.div style={inputStyles.innerColumn}>
      <Text variant="label" style={inputStyles.label}>{label}</Text>
      {hasValue ? (
        <html.div style={styles.valueRow}>
          <html.div style={styles.valueIcon}>
            {valueIcon ?? (
              <InsertDriveFileOutlined
                width={16}
                height={16}
                color={theme.colors.colorTextPrimary}
              />
            )}
          </html.div>
          <html.span style={styles.valueText}>{displayValue}</html.span>
        </html.div>
      ) : (
        <html.span style={[styles.valueText, styles.placeholderText]}>
          {displayValue}
        </html.span>
      )}
    </html.div>
  );

  return (
    <html.div style={inputStyles.wrapper} data-testid={testID}>
      <AnimatedContainer isFocused={isFocused} isError={resolvedVariant === 'error'} isGrouped={isGrouped}>
        <html.div
          style={[
            variantContainerStyleMap[resolvedVariant],
            isGrouped && inputStyles.containerGrouped,
            isFocused && resolvedVariant !== 'error' && inputStyles.containerFocused,
            disabled && inputStyles.containerDisabled,
            NATIVE_ANIMATED && inputStyles.containerNativeAnimated,
          ]}
        >
          {onClick ? (
            <html.button
              type="button"
              disabled={disabled}
              aria-disabled={disabled || undefined}
              aria-label={ariaLabel ?? label}
              onClick={disabled ? undefined : onClick}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={styles.contentButton}
            >
              {content}
            </html.button>
          ) : (
            <html.div style={styles.contentStatic}>
              {content}
            </html.div>
          )}

          {rightSlot && (
            <html.div style={inputStyles.rightSlotContainer}>
              {rightSlot}
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

AttachmentField.displayName = 'AttachmentField';
