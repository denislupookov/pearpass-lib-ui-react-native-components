import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { Link } from './Link';
import { Text } from '../Text';
import { tokens } from '../../theme/tokens.css';

const meta = {
    title: 'Components/Link',
    component: Link,
    tags: ['autodocs'],
    argTypes: {
        href: {
            control: 'text',
        },
        target: {
            control: 'select',
            options: ['_self', '_blank'],
        },
        isExternal: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

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
        color: tokens.colorTextSecondary,
    },
});

export const Playground: Story = {
    args: {
        href: '#',
        children: 'Link',
    },
};

export const WithTextVariants: Story = {
    args: {
        href: '#',
        children: 'continue with existing PearPass',
    },
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => (
        <html.div style={storyStyles.stack}>
            <html.div style={storyStyles.row}>
                <html.div style={storyStyles.label}>Text + Link</html.div>
                <Text variant="label">
                    By clicking Continue, you confirm that you have read and agree to the{' '}
                    <Link href="#">PearPass Application Terms of Use</Link>.
                </Text>
            </html.div>
        </html.div>
    ),
};