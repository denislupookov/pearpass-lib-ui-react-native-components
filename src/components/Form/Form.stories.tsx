import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { css, html } from 'react-strict-dom';
import { Form } from './Form';
import { PageHeader } from '../PageHeader';
import { Button } from '../Button';
import { TextArea } from '../TextArea';
import { KeyboardArrowRightFilled } from '../../icons';
import { tokens } from '../../theme/tokens.css';

const meta = {
    title: 'Components/Form',
    component: Form,
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyStyles = css.create({
    container: {
        width: 694,
        padding: tokens.spacing24,
        backgroundColor: tokens.colorSurfacePrimary,
        borderRadius: tokens.radius16,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = React.useState('');

        const handleSubmit = (e?: { preventDefault: () => void }) => {
            e?.preventDefault?.();
            window.alert('Form Content Submitted:\n\n' + value);
            args.onSubmit?.(e as unknown as React.FormEvent<HTMLFormElement>);
        };

        return (
            <html.div style={storyStyles.container}>
                <Form {...args} onSubmit={handleSubmit} aria-label="Functional feedback form">
                    <PageHeader
                        title="Functional Feedback"
                        subtitle="Type something below and hit send to see it read the content in the console."
                    />
                    <TextArea
                        label="Your Feedback"
                        placeholder="Type here..."
                        value={value}
                        onChange={setValue}
                        rows={4}
                    />
                    <html.div style={storyStyles.footer}>
                        <Button
                            type="submit"
                            variant="primary"
                            size='small'
                            iconAfter={<KeyboardArrowRightFilled />}
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    </html.div>
                </Form>
            </html.div>
        );
    },
};
