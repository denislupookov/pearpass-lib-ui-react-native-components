import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { html, css } from 'react-strict-dom';
import './react-strict-dom.css';
import { tokens } from '../src/theme/tokens.css';

const styles = css.create({
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#15180E',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
});

const preview: Preview = {
    decorators: [
        (Story) => (
            <html.div data-layoutconformance="strict" style={styles.container}>
                <Story />
            </html.div>
        ),
    ],
    parameters: {
        options: {
            storySort: {
                order: ['Welcome', '*'],
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'fullscreen',
    },
};

export default preview;
