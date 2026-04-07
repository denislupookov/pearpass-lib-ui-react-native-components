import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tokens.spacing8,
    width: '100%',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: tokens.colorSurfacePrimary,
    borderColor: tokens.colorBorderPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: tokens.radius8,
    overflow: 'hidden',
  },

  containerError: {
    borderColor: tokens.colorSurfaceError,
  },



  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  ctaSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },

});
