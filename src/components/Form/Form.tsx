import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Form.styles';
import { FormProps } from './types';

export const Form = ({
    children,
    style,
    testID,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: FormProps) => {
    return (
        <html.div
            role="form"
            style={[styles.root, style]}
            data-testid={testID}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
        >
            {children}
        </html.div>
    );
};

Form.displayName = 'Form';
