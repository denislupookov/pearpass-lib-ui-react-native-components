import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing12,
    gap: tokens.spacing12,
    borderRadius: tokens.radius8,
    backgroundColor: tokens.colorSurfaceHover,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: tokens.spacing8,
    flex: 1,
  },
  messageContainerBig: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing16,
    height: tokens.spacing16,
    flexShrink: 0,
  },
  iconContainerBig: {
    width: tokens.spacing24,
    height: tokens.spacing24,
  },
  copy: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 6,
    flexShrink: 1,
    width: '100%',
  },
  title: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightMedium,
    fontSize: tokens.fontSize14,
    lineHeight: tokens.spacing16,
    color: tokens.colorTextPrimary,
  },
  description: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightRegular,
    fontSize: tokens.fontSize12,
    lineHeight: tokens.spacing16,
    color: tokens.colorTextTertiary,
  },
  link: {
    fontFamily: tokens.fontPrimary,
    fontWeight: tokens.weightRegular,
    fontSize: tokens.fontSize12,
    lineHeight: tokens.spacing16,
  },

  sizeBig: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sizeMedium: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  variantError: {
    backgroundColor: tokens.colorSurfaceDestructive,
  },
  variantWarning: {
    // Same elevated background as success
  },
  iconWarning: {
    color: tokens.colorSurfaceWarning,
  },
  iconError: {
    color: tokens.colorSurfaceError,
  },
});

export const variantIconStyleMap = {
  warning: styles.iconWarning,
  error: styles.iconError,
};

export const variantStyleMap = {
  warning: styles.variantWarning,
  error: styles.variantError,
};

export const sizeStyleMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  big: styles.sizeBig,
};
