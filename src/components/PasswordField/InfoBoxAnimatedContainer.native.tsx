import React from 'react';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

interface InfoBoxAnimatedContainerProps {
  visible: boolean;
  children: React.ReactNode;
}

export const InfoBoxAnimatedContainer = ({
  visible,
  children,
}: InfoBoxAnimatedContainerProps): React.ReactElement | null =>
  visible ? (
    <Animated.View
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(150)}
    >
      {children}
    </Animated.View>
  ) : null;
