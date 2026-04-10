import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  contentButton: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    textAlign: 'left',
  },
  contentStatic: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
  },
  valueRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing8,
    width: '100%',
    minWidth: 0,
  },
  valueIcon: {
    display: 'flex',
    width: tokens.spacing16,
    height: tokens.spacing16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: tokens.colorTextPrimary,
  },
  valueText: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightMedium,
    fontSize: tokens.fontSize14,
    lineHeight: tokens.spacing20,
    color: tokens.colorTextPrimary,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  placeholderText: {
    color: tokens.colorTextSecondary,
  },
});
