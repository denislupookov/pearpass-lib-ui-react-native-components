import React from 'react';

/** @deprecated Use error prop instead */
export type InputFieldVariant = 'default' | 'error';

export interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  inputType?: 'text' | 'password';
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  // todo: what it means add explanation
  isGrouped?: boolean;
  testID?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  copyable?: boolean;
  onCopy?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  /** @deprecated Use placeholder instead */
  placeholderText?: string;
  /** @deprecated Use onChange instead */
  onChangeText?: (value: string) => void;
  /** @deprecated Use error instead */
  errorMessage?: string;
  /** @deprecated Derived automatically from error prop */
  variant?: InputFieldVariant;
}
