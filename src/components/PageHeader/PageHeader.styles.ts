import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing6,
    },
    subtitle: {
        color: tokens.colorTextSecondary,
    }
});
