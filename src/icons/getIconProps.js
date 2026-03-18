import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 *  fill?:boolean;
 * }} props
 *
 * @returns {{
 *  size: string;
 *  height: string;
 *  width: string;
 *  color: string;
 *  fill: boolean;
 * }}
 */
export const getIconProps = ({
  size = '24',
  height,
  width,
  color = colors.white.mode1,
  fill
}) => ({
  size: size,
  height: height || size,
  width: width || size,
  color: color,
  fill
})
