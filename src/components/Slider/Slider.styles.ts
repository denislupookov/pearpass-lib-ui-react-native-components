import type { CSSProperties } from 'react'
import { tokens } from '../../theme/tokens.css'

type SliderStyleMap = {
  root: CSSProperties
  rootDisabled: CSSProperties
  track: CSSProperties
  activeTrack: CSSProperties
  thumb: CSSProperties
}

export const styles: SliderStyleMap = {
  root: {
    width: '100%',
    height: '24px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    touchAction: 'none',
    userSelect: 'none'
  },
  rootDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    borderRadius: '999px',
    backgroundColor: tokens.colorSurfaceElevatedOnInteraction
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    height: '6px',
    borderRadius: '999px',
    backgroundColor: tokens.colorPrimary
  },
  thumb: {
    position: 'absolute',
    width: '14px',
    height: '14px',
    borderRadius: '999px',
    backgroundColor: tokens.colorPrimary
  }
}
