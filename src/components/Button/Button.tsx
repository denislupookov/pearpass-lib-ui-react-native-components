import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Button.styles';
import {
    iconOnlyStyleMap,
    iconSizeMap,
    sizeStyleMap,
    variantDisabledStyleMap,
    variantStyleMap,
} from './Button.config';
import { ButtonSize, ButtonVariant } from './types';

type HtmlButtonProps = React.ComponentProps<typeof html.button>;

type SizableIconProps = {
    width?: number;
    height?: number;
};

type ButtonBaseProps = Omit<HtmlButtonProps, 'children' | 'disabled' | 'type' | 'onClick'> & {
    onClick?: HtmlButtonProps['onClick'];
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
    iconBefore?: React.ReactNode;
    iconAfter?: React.ReactNode;
    type?: 'button' | 'submit';
};

type ButtonWithLabel = ButtonBaseProps & {
    children: React.ReactNode;
    'aria-label'?: string;
};

type ButtonIconOnly = ButtonBaseProps & {
    children?: never;
    'aria-label': string;
};

export type ButtonProps = ButtonWithLabel | ButtonIconOnly;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        children,
        onClick,
        variant = 'primary',
        size = 'medium',
        disabled = false,
        isLoading = false,
        fullWidth = false,
        iconBefore,
        iconAfter,
        type = 'button',
        'aria-label': ariaLabel,
        ...rest
    },
    ref
) {
    const withIconSize = (icon: React.ReactNode, size: number) =>
        React.isValidElement<SizableIconProps>(icon)
            ? React.cloneElement(icon, { width: size, height: size })
            : icon;

    const hasChildren = children !== null && children !== undefined && children !== false;
    const hasiconBefore = Boolean(iconBefore);
    const hasiconAfter = Boolean(iconAfter);
    const isIconOnly = !hasChildren && (hasiconBefore || hasiconAfter);
    const iconSize = iconSizeMap[size];

    const isInteractionDisabled = disabled || isLoading;

    const sizeStyle = sizeStyleMap[size];
    const iconOnlyStyle = isIconOnly ? iconOnlyStyleMap[size] : null;
    const disabledStyle = disabled ? variantDisabledStyleMap[variant] : null;
    const fullWidthStyle = fullWidth ? styles.fullWidth : null;
    const interactionStyle = disabled ? styles.disabled : isLoading ? styles.loading : null;
    const loadingContentStyle = isLoading ? styles.loadingContent : null;

    const handleClick: HtmlButtonProps['onClick'] = (e) => {
        onClick?.(e);
    };

    return (
        <html.button
            {...rest}
            ref={ref}
            type={type}
            disabled={disabled}
            aria-disabled={isInteractionDisabled || undefined}
            aria-busy={isLoading || undefined}
            aria-label={ariaLabel}
            onClick={isInteractionDisabled ? undefined : handleClick}
            style={[
                styles.buttonBase,
                sizeStyle,
                iconOnlyStyle,
                fullWidthStyle,
                variantStyleMap[variant],
                disabledStyle,
                interactionStyle,
            ]}
        >
            {hasiconBefore && (
                <html.span
                    style={[styles.icon, styles.iconSize(iconSize), loadingContentStyle]}
                    aria-hidden={true}
                >
                    {withIconSize(iconBefore, iconSize)}
                </html.span>
            )}

            {hasChildren && (
                <html.span style={[styles.label, loadingContentStyle]}>{children}</html.span>
            )}

            {hasiconAfter && (
                <html.span
                    style={[styles.icon, styles.iconSize(iconSize), loadingContentStyle]}
                    aria-hidden={true}
                >
                    {withIconSize(iconAfter, iconSize)}
                </html.span>
            )}

            {isLoading && (
                <html.span style={styles.spinnerContainer} aria-hidden={true}>
                    <html.span style={styles.spinner} />
                </html.span>
            )}
        </html.button>
    );
});

Button.displayName = 'Button';
