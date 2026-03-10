import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing8,
    },
    label: {
        fontSize: tokens.fontSize12,
        fontWeight: tokens.weightMedium,
        color: tokens.colorTextPrimary,
        fontFamily: tokens.fontPrimary,
    },
    inputWrapper: {
        boxSizing: 'border-box',
        padding: tokens.spacing12,
        position: 'relative',
        borderRadius: tokens.radius8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: tokens.colorBorderSecondary,
        backgroundColor: tokens.colorSurfacePrimary,
        overflow: 'hidden',
        transitionProperty: 'border-color, background-color',
        transitionDuration: '150ms',
        transitionTimingFunction: 'ease',
        width: '100%',
        ':hover': {
            borderColor: tokens.colorPrimary,
            backgroundColor: tokens.colorSurfaceHover,
        },
    },
    inputWrapperFocused: {
        borderColor: tokens.colorPrimary,
        ':hover': {
            borderColor: tokens.colorPrimary,
        },
    },
    inputWrapperError: {
        borderColor: tokens.colorSurfaceError,
        ':hover': {
            borderColor: tokens.colorSurfaceError,
        },
    },
    inputWrapperDisabled: {
        opacity: 0.5,
    },
    textarea: {
        boxSizing: 'border-box',
        width: '100%',
        fontSize: tokens.fontSize12,
        fontWeight: tokens.weightRegular,
        fontFamily: tokens.fontPrimary,
        color: tokens.colorTextPrimary,
        caretColor: tokens.colorPrimary,
        backgroundColor: 'transparent',
        borderWidth: 0,
        resize: 'none',
        outlineStyle: 'none',
        minHeight: 100,
    },
    textareaDisabled: {
        cursor: 'not-allowed',
    }
});
