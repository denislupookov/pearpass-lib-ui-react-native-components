import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

interface AnimatedContainerProps {
  isFocused: boolean;
  isError: boolean;
  children: React.ReactNode;
}

const DURATION = 150;

export const AnimatedContainer = ({
  isFocused,
  isError,
  children,
}: AnimatedContainerProps): React.ReactElement => {
  const { theme } = useTheme();

  const borderColor = useSharedValue(theme.colors.colorBorderPrimary);
  const backgroundColor = useSharedValue(theme.colors.colorSurfacePrimary);

  React.useEffect(() => {
    if (isError) {
      borderColor.value = withTiming(theme.colors.colorSurfaceError, { duration: DURATION });
      backgroundColor.value = withTiming(theme.colors.colorSurfacePrimary, { duration: DURATION });
    } else if (isFocused) {
      borderColor.value = withTiming(theme.colors.colorFocusRing, { duration: DURATION });
      backgroundColor.value = withTiming(theme.colors.colorSurfaceHover, { duration: DURATION });
    } else {
      borderColor.value = withTiming(theme.colors.colorBorderPrimary, { duration: DURATION });
      backgroundColor.value = withTiming(theme.colors.colorSurfacePrimary, { duration: DURATION });
    }
  }, [isFocused, isError, theme, borderColor, backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    backgroundColor: backgroundColor.value,
  }));

  return (
    <Animated.View style={[{ borderRadius: 8, borderWidth: 1, overflow: 'hidden' }, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

/** On native, the Animated.View provides border/background — inner container must be transparent. */
export const NATIVE_ANIMATED = true;
