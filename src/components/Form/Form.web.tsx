import React from 'react';
import { css } from 'react-strict-dom';
import { styles } from './Form.styles';
import { FormProps } from './types';

export const Form = ({
    children,
    onSubmit,
    style,
    testID,
    noValidate,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: FormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form
            {...css.props([styles.root, style])}
            onSubmit={handleSubmit}
            noValidate={noValidate}
            data-testid={testID}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
        >
            {children}
        </form>
    );
};

Form.displayName = 'Form';
