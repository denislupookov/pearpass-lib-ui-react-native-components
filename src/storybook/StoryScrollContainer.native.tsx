import React from 'react';
import { ScrollView } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export function StoryScrollContainer({ children }: Props) {
  return <ScrollView style={{ flex: 1 }}>{children}</ScrollView>;
}
