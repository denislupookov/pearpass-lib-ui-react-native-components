import { tokens } from '../../theme/tokens.css';
import { styles } from './Button.styles';
import { ButtonSize, ButtonVariant } from './types';

export const variantTextColorMap: Record<ButtonVariant, string> = {
    primary: tokens.colorOnPrimary,
    secondary: tokens.colorTextPrimary,
    tertiary: tokens.colorTextPrimary,
    destructive: tokens.colorTextPrimary,
};

export const variantDisabledTextColor = tokens.colorTextDisabled;

export const variantStyleMap = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    tertiary: styles.variantTertiary,
    destructive: styles.variantDestructive,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;

export const sizeStyleMap = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
} satisfies Record<ButtonSize, (typeof styles)[keyof typeof styles]>;

export const iconOnlyStyleMap = {
    small: styles.iconOnlySmall,
    medium: styles.iconOnlyMedium,
} satisfies Record<ButtonSize, (typeof styles)[keyof typeof styles]>;

export const iconSizeMap: Record<ButtonSize, number> = {
    small: 16,
    medium: 18,
};

export const variantPressedStyleMap = {
    primary: styles.variantPrimaryPressed,
    secondary: styles.variantSecondaryPressed,
    tertiary: styles.variantTertiaryPressed,
    destructive: styles.variantDestructivePressed,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;

export const variantDisabledStyleMap = {
    primary: styles.variantPrimaryDisabled,
    secondary: styles.variantSecondaryDisabled,
    tertiary: styles.variantTertiaryDisabled,
    destructive: styles.variantDestructiveDisabled,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;

export const variantTextStyleMap = {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    tertiary: styles.textTertiary,
    destructive: styles.textDestructive,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;

export const variantDisabledTextStyleMap = {
    primary: styles.textDisabled,
    secondary: styles.textDisabled,
    tertiary: styles.textDisabled,
    destructive: styles.textDisabled,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;
