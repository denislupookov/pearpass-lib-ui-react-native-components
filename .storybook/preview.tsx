import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { html, css } from 'react-strict-dom';
import './react-strict-dom.css';

const styles = css.create({
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#15180E',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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
