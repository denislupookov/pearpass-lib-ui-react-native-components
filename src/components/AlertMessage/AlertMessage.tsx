import React from 'react';
import { html, css } from 'react-strict-dom';
import { Link } from '../Link';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { styles, variantStyleMap, sizeStyleMap } from './AlertMessage.styles';
import { AlertMessageProps, AlertVariant } from './types';
import InfoFilled from '../../icons/components/InfoFilled';
import ReportProblemRound from '../../icons/components/ReportProblemRound';
import Report from '../../icons/components/Report';

const ICON_SIZE_DEFAULT = 16;
const ICON_SIZE_BIG = 24;

const overrideStyles = css.create({
  bg: (value: string) => ({ backgroundColor: value }),
  text: (value: string) => ({ color: value }),
});

const variantIconMap: Record<AlertVariant, React.ComponentType<{ width: number; height: number; color?: string }>> = {
  info: InfoFilled,
  warning: ReportProblemRound,
  error: Report,
};

const getVariantIconColor = (variant: AlertVariant, colors: ReturnType<typeof useTheme>['theme']['colors']) => {
  switch (variant) {
    case 'info': return colors.colorTextPrimary;
    case 'warning': return colors.colorSurfaceWarning;
    case 'error': return colors.colorSurfaceError;
  }
};

export const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  ({ variant, size, backgroundColor, color, title, actionText, onAction, description, testID, actionTestId, ...rest }, ref) => {
    const { theme } = useTheme();
    const iconColor = color ?? getVariantIconColor(variant, theme.colors);
    const IconComponent = variantIconMap[variant];
    const iconSize = size === 'big' ? ICON_SIZE_BIG : ICON_SIZE_DEFAULT;

    return (
      <html.div
        {...rest}
        ref={ref}
        data-testid={testID}
        style={[styles.container, variantStyleMap[variant], sizeStyleMap[size], backgroundColor != null && overrideStyles.bg(backgroundColor)]}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
      >
        <html.div style={[styles.messageContainer, size === 'big' && styles.messageContainerBig]}>
          <html.div style={[styles.iconContainer, size === 'big' && styles.iconContainerBig]} aria-hidden={true}>
            <IconComponent width={iconSize} height={iconSize} color={iconColor} />
          </html.div>
          <html.div style={styles.copy}>
            {size !== 'small' && (
              <Text variant="bodyEmphasized" style={[styles.title, color != null && overrideStyles.text(color)]}>
                {title}
              </Text>
            )}
            <Text variant="caption" style={[styles.description, color != null && overrideStyles.text(color)]}>
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
