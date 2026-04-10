import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.spacing8
  },
  rootBuiltIn: {
    borderWidth: 0,
    borderRadius: 0
  },
  optionWrapper: {
    display: 'flex',
    padding: tokens.spacing12,
    alignItems: 'center',
    gap: tokens.spacing12,
    alignSelf: 'stretch',
    cursor: 'pointer',
    userSelect: 'none'
  },
  optionWrapperBuiltIn: {
    padding: 0
  },
  optionWrapperDivider: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderPrimary
  },
  optionWrapperDisabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },
  ring: {
    display: 'flex',
    width: tokens.spacing16,
    height: tokens.spacing16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    flexShrink: 0
  },
  ringChecked: {
    borderColor: tokens.colorPrimary
  },
  ringUnchecked: {
    borderColor: tokens.colorBorderSecondary
  },
  ringDisabled: {
    opacity: 0.25
  },
  ringEnabled: {
    opacity: 1
  },
  dot: {
    width: '10px',
    height: '10px',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: tokens.colorPrimary
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: tokens.spacing4,
    flex: 1
  },
  label: {
    color: tokens.colorTextPrimary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    lineHeight: 'normal'
  },
  description: {
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightRegular,
    lineHeight: 'normal'
  }
})
