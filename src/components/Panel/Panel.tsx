import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Panel.styles';
import { Text } from '../Text';
import { Close } from '../../icons';
import { Button } from '../Button';
import { useTheme } from '../../theme';

type HtmlDivProps = React.ComponentProps<typeof html.div>;

export interface PanelProps extends Omit<HtmlDivProps, 'children' | 'title'> {
    title: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
    hideCloseButton?: boolean;
    closeButtonAriaLabel?: string;
    testID?: string;
    closeButtonTestID?: string;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(function Panel(
    {
        title,
        children,
        footer,
        onClose,
        hideCloseButton = false,
        closeButtonAriaLabel = 'Close',
        style: userStyle,
        testID,
        closeButtonTestID,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        ...rest
    },
    ref
) {
    const { theme } = useTheme();
    const hasBody = children !== undefined && children !== null && children !== false;
    const hasFooter = footer !== undefined && footer !== null && footer !== false;
    const titleId = React.useId();
    const bodyId = React.useId();

    return (
        <html.div
            {...rest}
            ref={ref}
            data-testid={testID}
            aria-labelledby={ariaLabelledBy ?? titleId}
            aria-describedby={ariaDescribedBy ?? (hasBody ? bodyId : undefined)}
            style={[styles.root, userStyle]}
        >
            <html.div style={styles.header}>
                <Text id={titleId} style={styles.title}>
                    {title}
                </Text>
                {!hideCloseButton && (
                    <Button
                        variant="tertiary"
                        size="small"
                        iconBefore={<Close color={theme.colors.colorTextPrimary} />}
                        style={styles.closeButton}
                        onClick={onClose}
                        aria-label={closeButtonAriaLabel}
                        data-testid={closeButtonTestID}
                    />
                )}
            </html.div>

            {hasBody && (
                <html.div id={bodyId} style={styles.body}>
                    {children}
                </html.div>
            )}
            {hasFooter && <html.div style={styles.footer}>{footer}</html.div>}
        </html.div>
    );
});

Panel.displayName = 'Panel';
