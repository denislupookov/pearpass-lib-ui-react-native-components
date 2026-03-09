import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    titleBase: {
        margin: 0,
        color: tokens.colorTextPrimary,
        fontFamily: tokens.fontDisplay,
        fontSize: tokens.fontSize28,
        fontWeight: tokens.weightRegular,
        lineHeight: 'normal',
        letterSpacing: 0,
    },
});
