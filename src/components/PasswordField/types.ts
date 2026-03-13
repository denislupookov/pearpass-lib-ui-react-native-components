import { PasswordIndicatorVariant } from '../PasswordIndicator/types';

export interface PasswordFieldProps {
  label: string;
  value: string;
  placeholderText?: string;
  onChangeText: (value: string) => void;
  testID?: string;
  /** When 'error', border turns red */
  variant?: 'default' | 'error';
  /** Error message rendered below the component */
  errorMessage?: string;
  /** If defined, renders the PasswordIndicator to the left of the eye icon */
  passwordIndicator?: PasswordIndicatorVariant;
  isGrouped?: boolean;
}
