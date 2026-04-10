import React from 'react';
import { html } from 'react-strict-dom';

/** @deprecated Use error prop instead */
export type AttachmentFieldVariant = 'default' | 'error';

type HtmlButtonProps = React.ComponentProps<typeof html.button>;

export interface AttachmentFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  onClick?: HtmlButtonProps['onClick'];
  error?: string;
  valueIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
  isGrouped?: boolean;
  testID?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  'aria-label'?: string;
  /** @deprecated Use error instead */
  errorMessage?: string;
  /** @deprecated Derived automatically from error prop */
  variant?: AttachmentFieldVariant;
}
