import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  triggerWrapper: {
    position: 'relative',
    display: 'inline-flex',
    width: 'fit-content'
  },
  triggerWrapperFullWidth: {
    position: 'relative',
    display: 'block',
    width: '100%'
  },
  triggerInner: {
    display: 'block',
    width: '100%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 999
  },
  menuContainer: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacing4,
    backgroundColor: tokens.colorSurfacePrimary,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radius8,
    paddingBlock: tokens.spacing4,
    paddingInline: tokens.spacing4,
    zIndex: 1000,
    boxSizing: 'border-box',
    boxShadow: tokens.shadowMenu
  },
  menuContainerFullWidth: {
    alignItems: 'stretch'
  },
  menuPosition: (top: number, left: number, width: number) => ({
    top,
    left,
    width
  }),
  menuMaxHeight: (maxHeight: number) => ({
    maxHeight
  })
})
