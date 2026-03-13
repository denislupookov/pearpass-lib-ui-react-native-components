import React from 'react';
import { html } from 'react-strict-dom';
import { Link } from '../Link';
import { Text } from '../Text';
import { styles, variantStyleMap, sizeStyleMap, variantIconStyleMap } from './AlertMessage.styles';
import { AlertMessageProps } from './types';

export const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  ({ variant, size, icon, title, actionText, onAction, description, testID, actionTestId, ...rest }, ref) => {
    return (
      <html.div
        {...rest}
        ref={ref}
        data-testid={testID}
        style={[styles.container, variantStyleMap[variant], sizeStyleMap[size]]}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
      >
        <html.div style={[styles.messageContainer, size === 'big' && styles.messageContainerBig]}>
          {icon && (
            <html.span style={[styles.iconContainer, variantIconStyleMap[variant]]} aria-hidden={true}>
              {icon}
            </html.span>
          )}
          <html.div style={styles.copy}>
            {size !== 'small' && (
              <Text variant="bodyEmphasized" style={styles.title}>
                {title}
              </Text>
            )}
            <Text variant="caption" style={styles.description}>
              {description}
            </Text>
          </html.div>
        </html.div>
        {actionText && (
          <Link
            onClick={onAction}
            style={styles.link}
            data-testid={actionTestId}
          >
            {actionText}
          </Link>
        )}
      </html.div>
    );
  }
);

AlertMessage.displayName = 'AlertMessage';
