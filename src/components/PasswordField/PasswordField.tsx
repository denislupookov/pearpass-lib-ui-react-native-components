import React from 'react';
import { html } from 'react-strict-dom';
import { EyeFilled, EyeOutlined, InfoOutlined } from '../../icons';
import { InputField } from '../InputField/InputField';
import { PasswordIndicator } from '../PasswordIndicator/PasswordIndicator';
import { useTheme } from '../../theme';
import { styles } from './PasswordField.styles';
import { PasswordFieldProps } from './types';
import { Button } from '../Button';
import { InfoBoxAnimatedContainer } from './InfoBoxAnimatedContainer';

const EYE_OPEN_LABEL = 'Hide password';
const EYE_CLOSED_LABEL = 'Show password';

export const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
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
    passwordIndicator,
    leftSlot,
    rightSlot: rightSlotProp,
    disabled,
    readOnly,
    isGrouped,
    testID,
    copyable = false,
    onCopy,
    infoBox,
    onFocus,
    onBlur,
  } = props;

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible((prev) => !prev);

  const resolvedError = error ?? errorMessage;
  const resolvedPlaceholder = placeholder ?? placeholderText;

  const handleChange = onChange ??
    (onChangeText
      ? (e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)
      : undefined);

  const eyeButton = (
    <Button
      variant="tertiary"
      size="small"
      onClick={toggleVisibility}
      aria-label={isVisible ? EYE_OPEN_LABEL : EYE_CLOSED_LABEL}
      style={styles.eyeButton}
      data-testid="password-field-eye-button"
      disabled={false}
      iconBefore={
        isVisible
          ? <EyeFilled color={theme.colors.colorTextPrimary} />
          : <EyeOutlined color={theme.colors.colorTextPrimary} />
      }
    />
  );

  const builtRightSlot = (
    <html.div style={styles.rightSlotContainer}>
      {passwordIndicator && (
        <>
          <PasswordIndicator variant={passwordIndicator} />
          <html.div style={styles.divider} />
        </>
      )}
      {rightSlotProp}
      {eyeButton}
    </html.div>
  );

  const inputField = (
    <InputField
      label={label}
      name={name}
      value={value}
      placeholder={resolvedPlaceholder}
      onChange={handleChange}
      error={resolvedError}
      variant={variant}
      inputType={isVisible ? 'text' : 'password'}
      leftSlot={leftSlot}
      rightSlot={builtRightSlot}
      disabled={disabled}
      readOnly={readOnly}
      isGrouped={isGrouped}
      testID={testID}
      copyable={copyable}
      onCopy={onCopy}
      onFocus={() => { setIsFocused(true); onFocus?.(); }}
      onBlur={() => { setIsFocused(false); onBlur?.(); }}
    />
  );

  if (!infoBox) {
    return inputField;
  }

  return (
    <html.div>
      <html.div style={styles.inputWrapper}>{inputField}</html.div>
      <InfoBoxAnimatedContainer visible={isFocused}>
        <html.div style={styles.infoBox} data-testid="password-field-info-box">
          <html.div style={styles.infoBoxIcon}>
            <InfoOutlined
              width={16}
              height={16}
              color={theme.colors.colorTextSecondary}
            />
          </html.div>
          <html.span style={styles.infoBoxText}>{infoBox}</html.span>
        </html.div>
      </InfoBoxAnimatedContainer>
    </html.div>
  );
};

PasswordField.displayName = 'PasswordField';
