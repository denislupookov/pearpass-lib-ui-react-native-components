import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Button.styles';
import {
    iconOnlyStyleMap,
    iconSizeMap,
    sizeStyleMap,
    variantDisabledStyleMap,
    variantDisabledTextStyleMap,
    variantPressedStyleMap,
    variantStyleMap,
    variantTextStyleMap,
} from './Button.config';
import { ButtonSize, ButtonVariant } from './types';
import { withIconSize } from '../../utils';
import { ButtonSpinner } from './ButtonSpinner';
import { useTheme } from '../../theme';
import { usePressState } from '../../hooks/usePressState';

type HtmlButtonProps = React.ComponentProps<typeof html.button>;

type ButtonBaseProps = Omit<HtmlButtonProps, 'children' | 'disabled' | 'type' | 'onClick'> & {
    onClick?: HtmlButtonProps['onClick'];
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    isLoading?: boolean;
    pressed?: boolean;
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
        pressed = false,
        fullWidth = false,
        iconBefore,
        iconAfter,
        type = 'button',
        'aria-label': ariaLabel,
        style: userStyle,
        ...rest
    },
    ref
) {
    const { isPressed, pressHandlers } = usePressState();
    const { theme } = useTheme();
    const hasChildren = children !== null && children !== undefined && children !== false;
    const hasiconBefore = Boolean(iconBefore);
    const hasiconAfter = Boolean(iconAfter);
    const isIconOnly = !hasChildren && (hasiconBefore || hasiconAfter);
    const iconSize = iconSizeMap[size];

    const isInteractionDisabled = disabled || isLoading;

    const sizeStyle = sizeStyleMap[size];
    const iconOnlyStyle = isIconOnly ? iconOnlyStyleMap[size] : null;
    const pressedStyle = (pressed || isPressed) && !disabled ? variantPressedStyleMap[variant] : null;
    const disabledStyle = disabled ? variantDisabledStyleMap[variant] : null;
    const fullWidthStyle = fullWidth ? styles.fullWidth : null;
    const interactionStyle = disabled ? styles.disabled : isLoading ? styles.loading : null;
    const loadingContentStyle = isLoading ? styles.loadingContent : null;
    const textStyle = disabled ? variantDisabledTextStyleMap[variant] : variantTextStyleMap[variant];

    const runtimeIconColorMap: Record<ButtonVariant, string> = {
        primary: theme.colors.colorOnPrimary,
        secondary: theme.colors.colorTextPrimary,
        tertiary: theme.colors.colorPrimary,
        destructive: theme.colors.colorTextPrimary,
    };
    const iconColor = disabled ? theme.colors.colorTextDisabled : runtimeIconColorMap[variant];

    const runtimeTextColorMap: Record<ButtonVariant, string> = {
        primary: theme.colors.colorOnPrimary,
        secondary: theme.colors.colorTextPrimary,
        tertiary: theme.colors.colorPrimary,
        destructive: theme.colors.colorTextPrimary,
    };
    const textColor = disabled ? theme.colors.colorTextDisabled : runtimeTextColorMap[variant];

    const withIconColor = (icon: React.ReactNode) =>
        React.isValidElement<{ color?: string }>(icon) && !icon.props.color
            ? React.cloneElement(icon, { color: iconColor })
            : icon;

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
            {...pressHandlers}
            style={[
                styles.buttonBase,
                sizeStyle,
                iconOnlyStyle,
                fullWidthStyle,
                variantStyleMap[variant],
                pressedStyle,
                disabledStyle,
                interactionStyle,
                userStyle,
            ]}
        >
            {hasiconBefore && !isLoading && (
                <html.span
                    style={[styles.icon, styles.iconSize(iconSize), textStyle]}
                    aria-hidden={true}
                >
                    {withIconColor(withIconSize(iconBefore, iconSize))}
                </html.span>
            )}

            {hasChildren && (
                <html.span style={[styles.label, textStyle, styles.textColorRuntime(textColor), loadingContentStyle]}>{children}</html.span>
            )}

            {hasiconAfter && !isLoading && (
                <html.span
                    style={[styles.icon, styles.iconSize(iconSize), textStyle]}
                    aria-hidden={true}
                >
                    {withIconColor(withIconSize(iconAfter, iconSize))}
                </html.span>
            )}

            {isLoading && <ButtonSpinner color={iconColor} />}
        </html.button>
    );
});

Button.displayName = 'Button';
