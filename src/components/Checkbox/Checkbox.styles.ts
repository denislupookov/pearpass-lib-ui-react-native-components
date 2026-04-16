import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing12,
    alignSelf: 'stretch'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: tokens.spacing4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    cursor: 'pointer'
  },
  description: {
    color: tokens.colorTextSecondary
  },
  detailsDisabled: {
    opacity: 0.25
  },
  checkboxBase: {
    display: 'flex',
    width: tokens.spacing16,
    height: tokens.spacing16,
    flexShrink: 0,
    aspectRatio: 1,
    borderRadius: '4px',
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    userSelect: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-out'
  },
  checkboxUnchecked: {
    borderColor: tokens.colorBorderSecondary,
    backgroundColor: 'transparent'
  },
  checkboxChecked: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimary
  },
  checkboxDisabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.25
  },
  checkIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorOnPrimary,
    lineHeight: 0,
    flexShrink: 0
  }
})
