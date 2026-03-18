import React from 'react';
import { css, html } from 'react-strict-dom';

const infoBoxEnter = css.keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-8px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const styles = css.create({
  container: {
    animationName: infoBoxEnter,
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
  },
});

interface InfoBoxAnimatedContainerProps {
  visible: boolean;
  children: React.ReactNode;
}

export const InfoBoxAnimatedContainer = ({
  visible,
  children,
}: InfoBoxAnimatedContainerProps): React.ReactElement | null =>
  visible ? (
    <html.div style={styles.container}>
      {children}
    </html.div>
  ) : null;
