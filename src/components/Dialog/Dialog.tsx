import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Dialog.styles';
import { Text } from '../Text';
import { Close } from '../../icons';
import { Button } from '../Button';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type HtmlDivProps = React.ComponentProps<typeof html.div>;

export interface DialogProps extends Omit<HtmlDivProps, 'children' | 'title'> {
    title: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    open?: boolean;
    closeOnOutsideClick?: boolean;
    onClose?: () => void;
    hideCloseButton?: boolean;
    closeButtonAriaLabel?: string;
    testID?: string;
    closeButtonTestID?: string;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    trapFocus?: boolean;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
    {
        title,
        children,
        footer,
        open = true,
        closeOnOutsideClick = true,
        onClose,
        hideCloseButton = false,
        closeButtonAriaLabel = 'Close dialog',
        style: userStyle,
        testID,
        closeButtonTestID,
        initialFocusRef,
        trapFocus = true,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        ...rest
    },
    forwardedRef
) {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    };

    const hasBody = children !== undefined && children !== null && children !== false;
    const hasFooter = footer !== undefined && footer !== null && footer !== false;
    const titleId = React.useId();
    const bodyId = React.useId();

    useScrollLock(open);
    useFocusTrap(internalRef as React.RefObject<HTMLElement>, open && trapFocus, { initialFocusRef });

    React.useEffect(() => {
        if (!open || !onClose || typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    const dialogCard = (
        <html.div
            {...rest}
            ref={combinedRef}
            data-testid={testID}
            role="dialog"
            aria-modal={true}
            aria-labelledby={ariaLabelledBy ?? titleId}
            aria-describedby={ariaDescribedBy ?? (hasBody ? bodyId : undefined)}
            tabIndex={-1}
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
                        iconBefore={<Close />}
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

    return (
        <html.div style={styles.modalLayer}>
            <html.div
                style={styles.backdrop}
                onClick={closeOnOutsideClick ? onClose : undefined}
            />
            <html.div style={styles.dialogPositioner}>{dialogCard}</html.div>
        </html.div>
    );
});

Dialog.displayName = 'Dialog';
