import React from 'react';
import { html } from 'react-strict-dom';
import { EyeFilled, EyeOutlined, InfoOutlined } from '../../icons';
import { InputField } from '../InputField/InputField';
import { PasswordIndicator } from '../PasswordIndicator/PasswordIndicator';
import { useTheme } from '../../theme';
import { styles } from './PasswordField.styles';
import { PasswordFieldProps } from './types';
import { Button } from '../Button'
import { InfoBoxAnimatedContainer } from './InfoBoxAnimatedContainer';

const EYE_OPEN_LABEL = 'Hide password';
const EYE_CLOSED_LABEL = 'Show password';

export const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholderText,
    onChangeText,
    variant = 'default',
    errorMessage,
    passwordIndicator,
    isGrouped,
    testID,
    infoBox,
  } = props;

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible((prev) => !prev);

  const rightSlot = (
    <html.div style={styles.rightSlotContainer}>
      {passwordIndicator && (
        <>
          <PasswordIndicator variant={passwordIndicator} />
          <html.div style={styles.divider} />
        </>
      )}
      <Button
        variant={"tertiary"}
        size="small"
        onClick={toggleVisibility}
        aria-label={isVisible ? EYE_OPEN_LABEL : EYE_CLOSED_LABEL}
        style={styles.eyeButton}
        data-testid="password-field-eye-button"
        iconBefore={isVisible
          ? <EyeFilled color={theme.colors.colorTextPrimary} />
          : <EyeOutlined color={theme.colors.colorTextPrimary} />
        }
      />
    </html.div>
  );

  const inputField = (
    <InputField
      label={label}
      value={value}
      placeholderText={placeholderText}
      onChangeText={onChangeText}
      variant={variant}
      errorMessage={errorMessage}
      inputType={isVisible ? 'text' : 'password'}
      rightSlot={rightSlot}
      isGrouped={isGrouped}
      testID={testID}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
