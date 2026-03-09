import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    textBase: {
        margin: 0,
        color: tokens.colorTextPrimary,
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize14,
        fontWeight: tokens.weightRegular,
        lineHeight: 'normal',
        letterSpacing: 0,
    },
    variantLabel: {},
    variantBody: {
        fontSize: tokens.fontSize16,
    },
    variantBodyEmphasized: {
        fontSize: tokens.fontSize16,
        fontWeight: tokens.weightMedium,
    },
    variantCaption: {
        fontSize: tokens.fontSize12,
    },
});
