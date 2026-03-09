import { styles } from './Button.styles';
import { ButtonSize, ButtonVariant } from './types';

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

export const variantDisabledStyleMap = {
    primary: styles.variantPrimaryDisabled,
    secondary: styles.variantSecondaryDisabled,
    tertiary: styles.variantTertiaryDisabled,
    destructive: styles.variantDestructiveDisabled,
} satisfies Record<ButtonVariant, (typeof styles)[keyof typeof styles]>;
