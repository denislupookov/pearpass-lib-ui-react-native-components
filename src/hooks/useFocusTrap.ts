import React, { useEffect, useCallback } from 'react';

const FOCUSABLE_SELECTOR =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
    initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export const useFocusTrap = (
    ref: React.RefObject<HTMLElement>,
    active: boolean,
    options: UseFocusTrapOptions = {}
) => {
    const { initialFocusRef } = options;

    const handleTab = useCallback((e: KeyboardEvent) => {
        if (!ref.current || e.key !== 'Tab') return;

        const focusableElements = Array.from(
            ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }, [ref]);

    useEffect(() => {
        if (!active || typeof window === 'undefined' || typeof document === 'undefined') return;

        const previousFocus = document.activeElement as HTMLElement;

        const rafId = requestAnimationFrame(() => {
            const target =
                initialFocusRef?.current ??
                ref.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
                ref.current;

            target?.focus();
        });

        document.addEventListener('keydown', handleTab);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('keydown', handleTab);
            if (previousFocus && typeof previousFocus.focus === 'function') {
                previousFocus.focus();
            }
        };
    }, [active, handleTab, initialFocusRef, ref]);
};
