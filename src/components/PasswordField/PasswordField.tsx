import React from 'react';
import { html } from 'react-strict-dom';
import { EyeFilled, EyeOutlined } from '../../icons';
import { Button } from '../Button/Button';
import { InputField } from '../InputField/InputField';
import { PasswordIndicator } from '../PasswordIndicator/PasswordIndicator';
import { styles } from './PasswordField.styles';
import { PasswordFieldProps } from './types';

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
  } = props;

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible((prev) => !prev);

  const eyeIcon = (
    <Button
      variant="tertiary"
      onClick={toggleVisibility}
      size="small"
      aria-label={isVisible ? EYE_OPEN_LABEL : EYE_CLOSED_LABEL}
      iconBefore={isVisible ? <EyeFilled width={16} height={16} /> : <EyeOutlined width={16} height={16} />}
      data-testid="password-field-eye-button"
    />
  );

  const rightSlot = (
    <html.div style={styles.rightSlotContainer}>
      {passwordIndicator && (
        <>
          <PasswordIndicator variant={passwordIndicator} />
          <html.div style={styles.divider} />
        </>
      )}
      {eyeIcon}
    </html.div>
  );

  return (
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
    />
  );
};

PasswordField.displayName = 'PasswordField';
