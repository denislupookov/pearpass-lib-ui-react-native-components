import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: tokens.spacing8,
    paddingInline: tokens.spacing8,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  rightSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing4,
  },
  chevron: {
    display: 'flex',
    alignItems: 'center',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  searchPaddingWeb: {
    padding: tokens.spacing4,
    width: '100%',
    boxSizing: 'border-box',
  },
  searchPaddingNative: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: tokens.spacing16,
  },
  itemsListWeb: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 240,
    overflowY: 'auto',
    width: '100%',
    marginTop: tokens.spacing4,
  },
  itemsListNative: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: tokens.spacing4,
    paddingBottom: tokens.spacing24,
  },
  emptyState: {
    paddingBlock: tokens.spacing12,
    paddingInline: tokens.spacing16,
    textAlign: 'center' as const,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    color: tokens.colorTextSecondary,
  },
})
