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
            options: ['label', 'labelEmphasized', 'body', 'bodyEmphasized', 'caption'],
        },
    },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: Array<{ label: string; value: TextVariant }> = [
    { label: 'Label (14px)', value: 'label' },
    { label: 'Label Emphasized (14px medium)', value: 'labelEmphasized' },
    { label: 'Body (16px)', value: 'body' },
    { label: 'Body Emphasized (16px medium)', value: 'bodyEmphasized' },
    { label: 'Caption (12px)', value: 'caption' },
];

const longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

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
    truncationContainer: {
        maxWidth: 360,
    },
});

export const Playground: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
        variant: 'label',
        as: 'span',
    },
};

export const SingleLineTruncation: Story = {
    args: {
        children: longText,
        variant: 'body',
        numberOfLines: 1,
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <html.div style={storyStyles.stack}>
            <html.div style={storyStyles.row}>
                <html.span style={storyStyles.label}>numberOfLines=1</html.span>
                <html.div style={storyStyles.truncationContainer}>
                    <Text variant={args.variant} numberOfLines={1}>
                        {args.children}
                    </Text>
                </html.div>
            </html.div>
            <html.div style={storyStyles.row}>
                <html.span style={storyStyles.label}>No truncation (reference)</html.span>
                <html.div style={storyStyles.truncationContainer}>
                    <Text variant={args.variant}>{args.children}</Text>
                </html.div>
            </html.div>
        </html.div>
    ),
};

export const MultiLineTruncation: Story = {
    args: {
        children: longText,
        variant: 'body',
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <html.div style={storyStyles.stack}>
            {[1, 2, 3, 4].map((lines) => (
                <html.div key={lines} style={storyStyles.row}>
                    <html.span style={storyStyles.label}>
                        numberOfLines={lines}
                    </html.span>
                    <html.div style={storyStyles.truncationContainer}>
                        <Text variant={args.variant} numberOfLines={lines}>
                            {args.children}
                        </Text>
                    </html.div>
                </html.div>
            ))}
        </html.div>
    ),
};

export const TruncationWithVariants: Story = {
    args: {
        children: longText,
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <html.div style={storyStyles.stack}>
            {variants.map((variant) => (
                <html.div key={variant.value} style={storyStyles.row}>
                    <html.span style={storyStyles.label}>
                        {variant.label} — numberOfLines=1
                    </html.span>
                    <html.div style={storyStyles.truncationContainer}>
                        <Text variant={variant.value} numberOfLines={1}>
                            {args.children}
                        </Text>
                    </html.div>
                </html.div>
            ))}
        </html.div>
    ),
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
                    <html.span style={storyStyles.label}>{variant.label}</html.span>
                    <Text as={args.as} variant={variant.value}>
                        {args.children}
                    </Text>
                </html.div>
            ))}
        </html.div>
    ),
};
