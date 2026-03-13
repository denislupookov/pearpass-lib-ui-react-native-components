import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12,
    alignSelf: 'stretch'
  },

  uploadContainer: {
    width: '100%',
    display: 'flex',
    padding: tokens.spacing40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacing20,
    alignSelf: 'stretch',
    borderRadius: tokens.radius8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    boxSizing: 'border-box',
    position: 'relative'
  },
  uploadContainerDragOver: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorSurfaceHover
  },

  imageWrapper: {
    position: 'relative',
    display: 'flex'
  },
  image: {
    width: tokens.spacing40,
    height: tokens.spacing40,
    aspectRatio: '1/1',
    borderRadius: tokens.radius8,
    objectFit: 'cover'
  },

  imageIconBadge: {
    display: 'flex',
    width: tokens.spacing24,
    height: tokens.spacing24,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1/1',
    position: 'absolute',
    right: '-8px',
    bottom: '-8px',
    borderRadius: '6px',
    backgroundColor: tokens.colorSurfacePrimary,
    color: tokens.colorTextSecondary
  },

  uploadIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorTextSecondary
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing6,
    alignSelf: 'stretch'
  },
  mainText: {
    margin: 0
  },
  hintText: {
    color: tokens.colorTextSecondary
  },
  fileContainer: {
    display: 'flex',
    padding: tokens.spacing12,
    alignItems: 'center',
    gap: tokens.spacing12,
    alignSelf: 'stretch',
    borderRadius: tokens.radius8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    boxSizing: 'border-box'
  },

  fileIconContainer: {
    display: 'flex',
    width: tokens.spacing32,
    height: tokens.spacing32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: tokens.radius8,
    backgroundColor: tokens.colorSurfaceElevatedOnInteraction,
    flexShrink: 0
  },
  fileIconInner: {
    width: tokens.spacing16,
    height: tokens.spacing16,
    flexShrink: 0,
    color: tokens.colorTextPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  fileDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2px',
    flex: 1,
    overflow: 'hidden'
  },
  fileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorTextPrimary,
    fontWeight: tokens.weightMedium,
    width: '100%'
  },
  fileSize: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorTextSecondary,
    width: '100%'
  }
})
