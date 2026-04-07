import React from 'react';

export interface MultiSlotInputProps {
  /** The slot inputs to render. */
  children: React.ReactNode;

  /**
   * Node rendered below the slot list — typically an "Add another" Button.
   */
  actions?: React.ReactNode;

  /** Global error message displayed beneath the grouped container. */
  errorMessage?: string;

  testID?: string;
}
