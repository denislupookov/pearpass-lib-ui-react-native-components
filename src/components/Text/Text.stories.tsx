import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { Text } from './Text';
import { tokens } from '../../theme/tokens.css';
import type { TextVariant } from './types';

const meta = {
    title: 'Components/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['span', 'p'],
        },
        variant: {
            control: 'select',
            options: ['label', 'body', 'bodyEmphasized', 'caption'],
        },
    },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: Array<{ label: string; value: TextVariant }> = [
    { label: 'Label (14px)', value: 'label' },
    { label: 'Body (16px)', value: 'body' },
    { label: 'Body Emphasized (16px)', value: 'bodyEmphasized' },
    { label: 'Caption (12px)', value: 'caption' },
];

const storyStyles = css.create({
    stack: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing20,
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing8,
    },
    label: {
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize12,
        fontWeight: tokens.weightMedium,
        color: tokens.colorTextSecondary,
    },
});

export const Playground: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
        variant: 'label',
        as: 'span',
    },
};

export const VariantShowcase: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
        variant: 'label',
        as: 'span',
    },
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: (args) => (
        <html.div style={storyStyles.stack}>
            {variants.map((variant) => (
                <html.div key={variant.value} style={storyStyles.row}>
                    <html.div style={storyStyles.label}>{variant.label}</html.div>
                    <Text as={args.as} variant={variant.value}>
                        {args.children}
                    </Text>
                </html.div>
            ))}
        </html.div>
    ),
};
