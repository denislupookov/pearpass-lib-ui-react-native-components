import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { css, html } from 'react-strict-dom';
import { PageHeader } from './PageHeader';
import { tokens } from '../../theme/tokens.css';

const meta = {
    title: 'Components/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
    },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyStyles = css.create({
    container: {
        padding: tokens.spacing24,
        backgroundColor: tokens.colorSurfacePrimary,
        borderRadius: tokens.radius16,
        maxWidth: 694,
    },
    link: {
        color: tokens.colorTextPrimary,
        textDecoration: 'underline',
    }
});

export const Default: Story = {
    render: (args) => (
        <html.div style={storyStyles.container}>
            <PageHeader {...args} />
        </html.div>
    ),
    args: {
        title: 'Report a problem',
        subtitle: "Tell us what's going wrong and leave your email so we can follow up with you.",
    },
};

export const WithRichContent: Story = {
    render: (args) => (
        <html.div style={storyStyles.container}>
            <PageHeader {...args} />
        </html.div>
    ),
    args: {
        title: 'App version',
        subtitle: (
            <>
                Here you can find all the info about your app.
                <html.br />
                Check here to see the{' '}
                <html.a href="#" style={storyStyles.link}>
                    Terms of Use
                </html.a>
                ,{' '}
                <html.a href="#" style={storyStyles.link}>
                    Privacy Statement
                </html.a>{' '}
                and{' '}
                <html.a href="#" style={storyStyles.link}>
                    visit our website
                </html.a>
                .
            </>
        ),
    },
};
