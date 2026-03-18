import React from 'react';

/**
 * Web: CSS transitions on the container handle border/background animation,
 * so this is a simple pass-through.
 */
interface AnimatedContainerProps {
  isFocused: boolean;
  isError: boolean;
  children: React.ReactNode;
}

export const AnimatedContainer = ({ children }: AnimatedContainerProps): React.ReactElement => (
  <>{children}</>
);

/** On web, the html.div handles its own colors — no override needed. */
export const NATIVE_ANIMATED = false;
