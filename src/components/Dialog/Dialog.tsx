import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Dialog.styles';
import { Panel } from '../Panel';
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

    return (
        <html.div style={styles.modalLayer}>
            <html.div
                style={styles.backdrop}
                onClick={closeOnOutsideClick ? onClose : undefined}
            />
            <html.div style={styles.dialogPositioner}>
                <Panel
                    {...rest}
                    ref={combinedRef}
                    role="dialog"
                    aria-modal={true}
                    tabIndex={-1}
                    title={title}
                    footer={footer}
                    onClose={onClose}
                    hideCloseButton={hideCloseButton}
                    closeButtonAriaLabel={closeButtonAriaLabel}
                    style={userStyle}
                    testID={testID}
                    closeButtonTestID={closeButtonTestID}
                >
                    {children}
                </Panel>
            </html.div>
        </html.div>
    );
});

Dialog.displayName = 'Dialog';
