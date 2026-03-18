import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Button.styles';

interface ButtonSpinnerProps {
  color?: string;
}

export const ButtonSpinner = ({}: ButtonSpinnerProps): React.ReactElement => (
  <html.span style={styles.spinnerContainer} aria-hidden={true}>
    <html.span style={styles.spinner} />
  </html.span>
);
