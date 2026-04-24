import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

const backdropFadeIn = css.keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

const dialogEnter = css.keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(8px) scale(0.98)',
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(0) scale(1)',
    },
});

export const styles = css.create({
    modalLayer: {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: tokens.spacing48,
        paddingBlock: tokens.spacing40,
        boxSizing: 'border-box',
        zIndex: 999,
    },
    backdrop: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(8, 10, 5, 0.72)',
        animationName: backdropFadeIn,
        animationDuration: '180ms',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'both',
    },
    dialogPositioner: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 520,
        maxHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        animationName: dialogEnter,
        animationDuration: '180ms',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'both',
    },
});
