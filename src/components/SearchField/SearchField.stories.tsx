import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { css, html } from 'react-strict-dom';
import { SearchField } from './SearchField';
import { tokens } from '../../theme/tokens.css';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  argTypes: {
    value: { control: 'text' },
    placeholderText: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

const storyStyles = css.create({
  canvas: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
    padding: tokens.spacing24,
    width: '100%',
    boxSizing: 'border-box',
  },
});

const SearchFieldPreview = ({
  initialValue = '',
  placeholderText,
  size = 'small',
}: {
  initialValue?: string;
  placeholderText?: string;
  size?: 'small' | 'medium';
}) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <SearchField
      value={value}
      placeholderText={placeholderText}
      size={size}
      onChangeText={setValue}
    />
  );
};

export const Default: Story = {
  render: () => (
    <html.div style={storyStyles.canvas}>
      <SearchFieldPreview placeholderText="Search in All Items" />
    </html.div>
  ),
};

export const Medium: Story = {
  render: () => (
    <html.div style={storyStyles.canvas}>
      <SearchFieldPreview placeholderText="Search in All Items" size="medium" />
    </html.div>
  ),
};
