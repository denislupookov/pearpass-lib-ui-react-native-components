/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { useFonts } from 'expo-font';
import StorybookUI from './.rnstorybook';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Humble Nostalgia': require('./assets/fonts/humble-nostalgia.otf'),
    'Inter': require('./assets/fonts/inter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <StorybookUI />;
}
