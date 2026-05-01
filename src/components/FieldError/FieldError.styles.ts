import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing4,
        marginTop: tokens.spacing4,
        width: '100%',
    },
    text: {
        color: tokens.colorSurfaceDestructiveElevated,
        fontSize: tokens.fontSize12,
        fontFamily: tokens.fontPrimary,
        fontWeight: tokens.weightRegular,
        flexShrink: 1,
        flexBasis: 0,
        flexGrow: 1,
        minWidth: 0,
    },
     icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: tokens.colorSurfaceDestructiveElevated,
        lineHeight: 0,
        flexShrink: 0,
    },
});
