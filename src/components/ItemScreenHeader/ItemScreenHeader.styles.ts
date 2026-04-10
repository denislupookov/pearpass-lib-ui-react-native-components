import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        gap: tokens.spacing6,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing8,
        flex: 1,
        minWidth: 0,
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    placeholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: tokens.radius8,
        backgroundColor: tokens.colorSurfaceHover,
    },
    placeholderText: {
        color: tokens.colorTextPrimary,
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize16,
        fontWeight: tokens.weightMedium,
    },
    title: {
        color: tokens.colorTextPrimary,
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize16,
        fontWeight: tokens.weightMedium,
        lineHeight: 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing4,
        flexShrink: 0,
        color: tokens.colorTextPrimary,
    },
});
