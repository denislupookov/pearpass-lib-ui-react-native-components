import React from 'react';
import { html } from 'react-strict-dom';

export type SearchFieldSize = 'small' | 'medium';

export interface SearchFieldProps {
  value: string;
  placeholderText?: string;
  onChangeText: (value: string) => void;
  size?: SearchFieldSize;
  testID?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: React.ComponentProps<typeof html.div>['style'];
  'aria-label'?: string;
}
