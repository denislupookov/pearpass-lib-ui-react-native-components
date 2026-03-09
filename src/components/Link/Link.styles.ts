import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    linkBase: {
        color: tokens.colorPrimary,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'normal',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationSkipInk: 'auto',
        textDecorationThickness: 'auto',
        textUnderlineOffset: 'auto',
        textUnderlinePosition: 'from-font',
        cursor: 'pointer',
        '@media (hover: hover)': {
            ':hover': {
                color: tokens.colorAccentHover,
                textDecorationLine: 'none',
            },
        },
        ':active': {
            color: tokens.colorAccentActive,
        },
    },
});
