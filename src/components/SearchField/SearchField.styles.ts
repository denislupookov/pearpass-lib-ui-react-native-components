import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing8,
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderSearchField,
    borderRadius: tokens.radius8,
    backgroundColor: tokens.colorSurfaceSearchField,
    transitionProperty: 'border-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
  },
  rootSmall: {
    paddingTop: tokens.spacing8,
    paddingBottom: tokens.spacing8,
    paddingLeft: tokens.spacing12,
    paddingRight: tokens.spacing12,
  },
  rootMedium: {
    paddingTop: tokens.spacing12,
    paddingBottom: tokens.spacing12,
    paddingLeft: tokens.spacing12,
    paddingRight: tokens.spacing12,
  },
  rootFocused: {
    borderColor: tokens.colorFocusRing,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: tokens.colorTextSearchField,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    lineHeight: tokens.spacing16,
    color: tokens.colorTextSearchField,
    caretColor: tokens.colorTextSearchField,
    '::placeholder': {
      color: tokens.colorTextSearchField,
      opacity: 1,
    },
  },
});
