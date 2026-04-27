import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing12,
        width: '100%',
    }
});
