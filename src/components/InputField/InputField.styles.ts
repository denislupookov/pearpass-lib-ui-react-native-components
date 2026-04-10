import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacing8,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing12,
    gap: tokens.spacing4,
    borderRadius: tokens.radius8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    backgroundColor: tokens.colorSurfacePrimary,
    width: '100%',
    boxSizing: 'border-box',
    transitionProperty: 'border-color, background-color, box-shadow',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':hover': {
      borderColor: tokens.colorPrimary,
      backgroundColor: tokens.colorSurfaceHover,
    },
  },
  containerFocused: {
    borderColor: tokens.colorFocusRing,
    backgroundColor: tokens.colorSurfaceHover,
    boxShadow: '0px 0px 0px 2px rgba(176,217,68,0.35)',
    ':hover': {
      borderColor: tokens.colorFocusRing,
    },
  },
  containerError: {
    borderColor: tokens.colorSurfaceError,
  },
  containerNativeAnimated: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  containerGrouped: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: '1px',
    backgroundColor: 'transparent',
  },
  innerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    flex: 1,
  },
  label: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightRegular,
    fontSize: tokens.fontSize12,
    lineHeight: tokens.spacing16,
    color: tokens.colorTextPrimary,
  },
  input: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightMedium,
    fontSize: tokens.fontSize14,
    lineHeight: tokens.spacing20,
    color: tokens.colorTextPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    width: '100%',
    padding: 0,
    '::placeholder': {
      color: tokens.colorTextSecondary,
    },
  },
  inputValue: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightMedium,
    fontSize: tokens.fontSize14,
    lineHeight: tokens.spacing20,
    color: tokens.colorTextPrimary,
    width: '100%',
  },
  inputPlaceholder: {
    color: tokens.colorTextSecondary,
  },
  leftSlotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    paddingRight: tokens.spacing6,
  },
  rightSlotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    gap: tokens.spacing4,
  },
  selectButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing4,
    width: '100%',
    padding: tokens.spacing12,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    textAlign: 'left',
  },
  containerDisabled: {
    opacity: 0.5,
    ':hover': {
      borderColor: tokens.colorBorderPrimary,
      backgroundColor: tokens.colorSurfacePrimary,
    },
  },

  copyButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: tokens.colorTextPrimary,
  },
  errorMessage: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightRegular,
    fontSize: tokens.fontSize12,
    lineHeight: tokens.spacing16,
    color: tokens.colorSurfaceError,
  },
});

export const variantContainerStyleMap = {
  default: styles.container,
  error: [styles.container, styles.containerError],
};
