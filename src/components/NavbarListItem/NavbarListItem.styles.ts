import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing8,
    marginBlock: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
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
  sizeSmall: {
    borderRadius: tokens.radius8,
    paddingBlock: tokens.spacing8,
    paddingInline: tokens.spacing8
  },
  sizeBig: {
    borderRadius: 0,
    paddingBlock: tokens.spacing16,
    paddingInline: tokens.spacing16,
    backgroundColor: tokens.colorSurfacePrimary
  },
  pressed: {
    backgroundColor: tokens.colorSurfaceHover
  },
  divider: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colorBorderPrimary
  },
  selected: {
    backgroundColor: tokens.colorSurfaceHover,
    '@media (hover: hover)': {
      ':hover': {
        backgroundColor: tokens.colorSurfaceHover
      }
    }
  },
  variantDefault: {
    color: tokens.colorTextPrimary
  },
  variantSecondary: {
    color: tokens.colorTextSecondary
  },
  variantDestructive: {
    color: tokens.colorSurfaceDestructiveElevated
  },
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0
  },
  iconGroupItemSpacing: {
    marginLeft: tokens.spacing8
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  iconSize: (size: number) => ({
    width: size,
    height: size
  }),
  label: {
    flex: 1,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  count: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    flexShrink: 0
  },
  iconOnly: (size: number) => ({
    width: size,
    justifyContent: 'center' as const
  }),
  additionalItems: {
    fontSize: tokens.fontSize14,
    display: 'flex',
    alignItems: 'center'
  }
})
