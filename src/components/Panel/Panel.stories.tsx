import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { Panel } from './Panel';
import { Button } from '../Button';
import { tokens } from '../../theme/tokens.css';

const meta = {
    title: 'Components/Panel',
    component: Panel,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'closed' },
        hideCloseButton: { control: 'boolean' },
        title: { control: 'text' },
        children: { control: false },
        footer: { control: false },
    },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyStyles = css.create({
    canvas: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing24,
        padding: tokens.spacing24,
        maxWidth: 520,
    },
});

const footerActions = (
    <>
        <Button variant="secondary" size="small">
            Cancel
        </Button>
        <Button variant="primary" size="small">
            Confirm
        </Button>
    </>
);

export const Playground: Story = {
    args: {
        title: 'Inline Panel',
        children: 'This Panel renders inline without a modal overlay.',
        footer: footerActions,
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <Panel {...args} />
        </html.div>
    ),
};

export const WithoutFooter: Story = {
    args: {
        title: 'Information',
        children: 'This is a simple inline panel without footer actions.',
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <Panel {...args} />
        </html.div>
    ),
};

export const WithoutCloseButton: Story = {
    args: {
        title: 'Notice',
        children: 'This panel has no close button.',
        footer: footerActions,
        hideCloseButton: true,
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <Panel {...args} />
        </html.div>
    ),
};
