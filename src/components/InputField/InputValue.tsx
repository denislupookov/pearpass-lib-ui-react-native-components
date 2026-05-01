import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './InputField.styles';
import { InputValueProps } from './types';

export const InputValue = ({ inputRef, as: _as, ...rest }: InputValueProps): React.ReactElement => {
  const { disabled, readOnly, onClick } = rest;
  const preventFocus = readOnly && onClick
    ? (e: React.MouseEvent<HTMLInputElement>) => e.preventDefault()
    : undefined;

  return (
    <html.input
      {...rest}
      ref={inputRef}
      onClick={disabled || readOnly ? undefined : onClick}
      onMouseDown={preventFocus}
      style={[styles.input, disabled && styles.containerDisabled]}
    />
  );
};
