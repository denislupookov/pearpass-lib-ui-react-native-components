import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './MultiSlotInput.styles';
import { MultiSlotInputProps } from './types';
import { FieldError } from '../FieldError/FieldError';

export const MultiSlotInput = (props: MultiSlotInputProps): React.ReactElement => {
  const { children, actions, errorMessage, testID } = props;

  return (
    <html.div style={styles.root} data-testid={testID}>
      <html.div style={[styles.container, !!errorMessage && styles.containerError]}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return (
            <html.div style={styles.row} key={index}>
              {React.cloneElement(child as React.ReactElement<{ isGrouped?: boolean }>, { isGrouped: true })}
            </html.div>
          );
        })}

        {actions && (
          <html.div style={styles.ctaSlot}>{actions}</html.div>
        )}
      </html.div>

      {errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </html.div>
  );
};

MultiSlotInput.displayName = 'MultiSlotInput';