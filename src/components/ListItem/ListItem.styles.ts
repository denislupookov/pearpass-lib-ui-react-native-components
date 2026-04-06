import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing12,
    gap: tokens.spacing12,
    borderWidth: 0,
    borderRadius: tokens.radius8,
    boxSizing: 'border-box',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    '@media (hover: hover)': {
      ':hover': {
        backgroundColor: tokens.colorSurfaceHover
      }
    },
    ':active': {
      backgroundColor: tokens.colorSurfaceHover
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: tokens.colorFocusRing,
      outlineOffset: -2
    }
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  iconSize: (size: number) => ({
    width: size,
    height: size
  }),
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightRegular,
    color: tokens.colorTextSecondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  subtitleDividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing8,
    minWidth: 0
  },
  subtitleSegment: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightRegular,
    color: tokens.colorTextSecondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0
  },
  dividerLine: {
    display: 'flex',
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: tokens.colorBorderSecondary
  },
  subtitleDividerContainerVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing4,
    alignSelf: 'flex-start',
    minWidth: 0
  },
  dividerLineHorizontal: {
    display: 'flex',
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: tokens.colorBorderSecondary
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    gap: tokens.spacing8
  },
  mobile: {
    borderRadius: 0,
    paddingBlock: tokens.spacing16,
    paddingInline: tokens.spacing16
  },
  pressed: {
    backgroundColor: tokens.colorSurfaceHover
  },
  selected: {
    backgroundColor: tokens.colorSurfaceHover,
    '@media (hover: hover)': {
      ':hover': {
        backgroundColor: tokens.colorSurfaceHover
      }
    }
  },
  showDivider: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary
  },
  variantDefault: {},
  variantDestructive: {
    backgroundColor: tokens.colorSurfaceDestructive
  },
  iconAlignTop: {
    display: 'flex',
    alignSelf: 'flex-start'
  }
})
