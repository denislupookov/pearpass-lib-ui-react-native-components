import React from 'react';
import { PasswordIndicatorVariant } from '../PasswordIndicator/types';

export interface PasswordFieldProps {
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  passwordIndicator?: PasswordIndicatorVariant;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  isGrouped?: boolean;
  testID?: string;
  copyable?: boolean;
  onCopy?: (value: string) => void;
  infoBox?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  /** @deprecated Use placeholder instead */
  placeholderText?: string;
  /** @deprecated Use onChange instead */
  onChangeText?: (value: string) => void;
  /** @deprecated Use error instead */
  errorMessage?: string;
  /** @deprecated Derived automatically from error prop */
  variant?: 'default' | 'error';
}
