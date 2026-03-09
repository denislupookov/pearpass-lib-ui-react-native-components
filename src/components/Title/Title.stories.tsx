import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
    title: 'Components/Title',
    component: Title,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
    },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
        as: 'h1',
    },
};
