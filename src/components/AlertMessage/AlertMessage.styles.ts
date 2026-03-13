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
  },
  messageContainerBig: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing24,
    height: tokens.spacing24,
    flexShrink: 0,
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
    color: tokens.colorTextSecondary,
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
  variantSuccess: {
    // Relying on default container background #212814
  },
  variantError: {
    backgroundColor: tokens.colorSurfaceDestructive,
  },
  iconSuccess: {
    color: tokens.colorPrimary,
  },
  iconError: {
    color: tokens.colorSurfaceError,
  },
});

export const variantIconStyleMap = {
  success: styles.iconSuccess,
  error: styles.iconError,
};

export const variantStyleMap = {
  success: styles.variantSuccess,
  error: styles.variantError,
};

export const sizeStyleMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  big: styles.sizeBig,
};
