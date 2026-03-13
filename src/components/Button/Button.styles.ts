import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

const spin = css.keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const styles = css.create({
    buttonBase: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none',
        boxSizing: 'border-box',
        transitionProperty: 'background-color, border-color, color, opacity',
        transitionDuration: '150ms',
        transitionTimingFunction: 'ease-out',
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize14,
        fontWeight: tokens.weightMedium,
        gap: tokens.spacing4,
        lineHeight: 'normal',
        ':focus-visible': {
            outlineWidth: 2,
            outlineStyle: 'solid',
            outlineColor: tokens.colorFocusRing,
            outlineOffset: 2,
        },
    },
    fullWidth: {
        width: '100%',
        display: 'flex',
    },
    sizeSmall: {
        paddingBlock: tokens.spacing8,
        paddingInline: tokens.spacing12,
        borderRadius: tokens.radius8,
    },
    sizeMedium: {
        paddingBlock: tokens.spacing12,
        paddingInline: tokens.spacing12,
        borderRadius: tokens.radius8,
    },
    iconOnlySmall: {
        paddingInline: tokens.spacing4,
        paddingBlock: tokens.spacing4,
    },
    iconOnlyMedium: {
        paddingBlock: tokens.spacing12,
        paddingInline: tokens.spacing12,
    },
    label: {
        color: 'currentColor',
        lineHeight: 'normal',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'currentColor',
        lineHeight: 0,
        flexShrink: 0,
    },
    iconSize: (size: number) => ({
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        overflow: 'visible',
    }),
    disabled: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
    },
    loading: {
        cursor: 'progress',
        pointerEvents: 'none',
    },
    loadingContent: {
        opacity: 0,
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
    },
    spinner: {
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
        animationName: spin,
        animationDuration: '600ms',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
    },
    variantPrimary: {
        backgroundColor: tokens.colorPrimary,
        borderColor: tokens.colorPrimary,
        color: tokens.colorOnPrimary,
        ':hover': {
            backgroundColor: tokens.colorAccentHover,
            borderColor: tokens.colorAccentHover,
        },
        ':active': {
            backgroundColor: tokens.colorAccentActive,
            borderColor: tokens.colorAccentActive,
        },
    },
    variantPrimaryDisabled: {
        backgroundColor: tokens.colorSurfaceDisabled,
        borderColor: tokens.colorSurfaceDisabled,
        color: tokens.colorTextDisabled,
    },
    variantSecondary: {
        backgroundColor: 'transparent',
        borderColor: tokens.colorBorderPrimary,
        color: tokens.colorTextPrimary,
        ':hover': {
            backgroundColor: tokens.colorSurfaceHover,
            borderColor: tokens.colorBorderSecondary,
        },
        ':active': {
            backgroundColor: tokens.colorSurfaceElevatedOnInteraction,
            borderColor: tokens.colorBorderSecondary,
        },
    },
    variantSecondaryDisabled: {
        backgroundColor: 'transparent',
        borderColor: tokens.colorBorderPrimary,
        color: tokens.colorTextDisabled,
    },
    variantTertiary: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: tokens.colorPrimary,
        ':hover': {
            backgroundColor: tokens.colorSurfaceHover,
        },
        ':active': {
            backgroundColor: tokens.colorSurfaceElevatedOnInteraction,
        },
    },
    variantTertiaryDisabled: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: tokens.colorTextDisabled,
    },
    variantDestructive: {
        backgroundColor: tokens.colorSurfaceDestructive,
        borderColor: tokens.colorSurfaceDestructive,
        color: tokens.colorTextPrimary,
        ':hover': {
            backgroundColor: tokens.colorSurfaceError,
            borderColor: tokens.colorSurfaceError,
        },
        ':active': {
            backgroundColor: tokens.colorSurfaceDestructiveElevated,
            borderColor: tokens.colorSurfaceDestructiveElevated,
        },
    },
    variantDestructiveDisabled: {
        backgroundColor: tokens.colorSurfaceDisabled,
        borderColor: tokens.colorSurfaceDisabled,
        color: tokens.colorTextDisabled,
    },
});
