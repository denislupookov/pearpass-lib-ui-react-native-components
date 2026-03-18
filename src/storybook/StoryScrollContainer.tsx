import React from 'react';
import { css, html } from 'react-strict-dom';

const styles = css.create({
  container: {
    flex: 1,
    overflowY: 'auto',
  },
});

type Props = {
  children: React.ReactNode;
};

export function StoryScrollContainer({ children }: Props) {
  return <html.div style={styles.container}>{children}</html.div>;
}
