import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

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
    },
    dialogPositioner: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 520,
        maxHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
});
