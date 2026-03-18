import React from 'react';

export type InputFieldVariant = 'default' | 'error';

export interface InputFieldProps {
  label: string;
  value: string;
  placeholderText?: string;
  onChangeText: (value: string) => void;
  /** When 'error', border turns red */
  variant?: InputFieldVariant;
  /** Error message rendered below the component */
  errorMessage?: string;
  /** Input type — use 'password' to mask the value */
  inputType?: 'text' | 'password';
  /** Optional node rendered on the right side inside the container (e.g. eye icon) */
  rightSlot?: React.ReactNode;
  /** When true, removes external borders and radius for grouping (keeps bottom border) */
  isGrouped?: boolean;
  testID?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** Called when the input gains focus */
  onFocus?: () => void;
  /** Called when the input loses focus */
  onBlur?: () => void;
}
