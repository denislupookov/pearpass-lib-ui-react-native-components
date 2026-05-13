import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  triggerWrapper: {
    position: 'relative',
    display: 'inline-flex',
    width: 'fit-content'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  menuContainer: {
    position: 'absolute',
    top: '100%',
    marginTop: 5,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tokens.spacing4,
    minWidth: '100%',
    backgroundColor: tokens.colorSurfacePrimary,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radius8,
    paddingBlock: tokens.spacing4,
    paddingInline: tokens.spacing4,
    zIndex: 1000,
    boxSizing: 'border-box',
    overflowY: 'auto',
    boxShadow: tokens.shadowMenu
  },
  menuMinWidth: (minWidth: number) => ({
    minWidth
  }),
  menuMaxHeight: (maxHeight: number) => ({
    maxHeight
  })
})
