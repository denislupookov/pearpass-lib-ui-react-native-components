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
    alignItems: 'center',
    padding: tokens.spacing12,
    gap: tokens.spacing4,
    height: '39px',
    boxSizing: 'border-box',
  },

  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing4,
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: tokens.colorPrimary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightRegular,
    padding: 0,
    transitionProperty: 'opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':hover': {
      opacity: 0.8,
    },
    ':active': {
      opacity: 0.6,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colorFocusRing,
      outlineOffset: '2px',
    },
  },

  addIcon: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    lineHeight: '1',
    fontWeight: tokens.weightMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonLabel: {
    color: 'currentColor',
    lineHeight: '15px',
  },

  removeIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: tokens.fontPrimary,
    fontSize: '14px',
    lineHeight: '1',
  }
});
