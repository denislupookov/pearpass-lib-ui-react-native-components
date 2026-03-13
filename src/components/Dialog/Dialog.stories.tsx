import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { Dialog } from './Dialog';
import { Button } from '../Button';
import { Text } from '../Text';
import { tokens } from '../../theme/tokens.css';
import { InputField } from '../InputField';
import { PasswordField } from '../PasswordField';
import { VerifiedUser } from '../../icons';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'closed' },
        hideCloseButton: { control: 'boolean' },
        title: { control: 'text' },
        children: { control: false },
        footer: { control: false },
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const footerActions = (
    <>
        <Button variant="secondary" size="small">
            Discard
        </Button>
        <Button variant="primary" size="small">
            Save
        </Button>
    </>
);

const storyStyles = css.create({
    canvas: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing24,
        padding: tokens.spacing24,
    },
    dialogNarrow: {
        maxWidth: 520,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: tokens.spacing24,
    },
    dialogWide: {
        width: 500,
    },
    centeredBody: {
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing12,
        width: '100%',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing12,
    },
    sectionTitle: {
        color: tokens.colorTextSecondary,
        textTransform: 'capitalize',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: tokens.colorBorderPrimary,
        borderRadius: tokens.radius8,
        backgroundColor: tokens.colorSurfacePrimary,
        overflow: 'hidden',
    },
    generateButton: {
        color: tokens.colorPrimary,
        alignSelf: 'flex-start',
        padding: tokens.spacing12,
    },
});

export const Playground: Story = {
    args: {
        title: 'Title',
        children: 'Your intended dialogue message goes here',
        footer: footerActions,
        trapFocus: false,
    },
    render: (args) => (
        <html.div style={[storyStyles.canvas, storyStyles.dialogNarrow]}>
            <Dialog {...args} />
        </html.div>
    ),
};


export const AddNewItemExample: Story = {
    args: {
        title: 'New Identify Item',
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        const [title, setTitle] = React.useState('');
        const [name, setName] = React.useState('');
        const [email, setEmail] = React.useState('');
        const [phone, setPhone] = React.useState('');
        const [street, setStreet] = React.useState('');
        const [country, setCountry] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [totp, setTotp] = React.useState('');
        const [website, setWebsite] = React.useState('');
        const titleInputRef = React.useRef<HTMLInputElement>(null);

        const handleClose = () => {
            setOpen(false);
            args.onClose?.();
        };

        return (
            <html.div style={storyStyles.canvas}>
                <html.div>
                    <Button variant="primary" size="small" onClick={() => setOpen(true)}>
                        Add New Item
                    </Button>
                </html.div>

                <Dialog
                    open={open}
                    title={args.title}
                    onClose={handleClose}
                    style={storyStyles.dialogWide}
                    initialFocusRef={titleInputRef}
                    footer={
                        <>
                            <Button variant="secondary" size="small" onClick={handleClose}>
                                Discard
                            </Button>
                            <Button variant="primary" size="small" onClick={handleClose}>
                                Add Item
                            </Button>
                        </>
                    }
                >
                    <html.div style={storyStyles.formContainer}>
                        <InputField
                            label="Title"
                            placeholderText="Enter Title"
                            value={title}
                            onChangeText={setTitle}
                            inputRef={titleInputRef}
                        />

                        <html.div style={storyStyles.section}>
                            <Text variant="caption" style={storyStyles.sectionTitle}>Personal Information</Text>
                            <html.div style={storyStyles.fieldGroup}>
                                <InputField
                                    label="Fullname"
                                    placeholderText="Enter Name"
                                    value={name}
                                    onChangeText={setName}
                                    isGrouped
                                />
                                <InputField
                                    label="Email"
                                    placeholderText="Enter Email Address"
                                    value={email}
                                    onChangeText={setEmail}
                                    isGrouped
                                />
                                <InputField
                                    label="Phone Number"
                                    placeholderText="Enter Phone Number"
                                    value={phone}
                                    onChangeText={setPhone}
                                    isGrouped
                                />
                            </html.div>
                        </html.div>

                        <html.div style={storyStyles.section}>
                            <Text variant="caption" style={storyStyles.sectionTitle}>Address Details</Text>
                            <html.div style={storyStyles.fieldGroup}>
                                <InputField
                                    label="Street Address"
                                    placeholderText="Enter Street Name With Number"
                                    value={street}
                                    onChangeText={setStreet}
                                    isGrouped
                                />
                                <InputField
                                    label="Country"
                                    placeholderText="Enter Country"
                                    value={country}
                                    onChangeText={setCountry}
                                    isGrouped
                                />
                            </html.div>
                        </html.div>

                        <html.div style={storyStyles.section}>
                            <Text variant="caption" style={storyStyles.sectionTitle}>Credentials</Text>
                            <html.div style={storyStyles.fieldGroup}>
                                <InputField
                                    label="Email / Username"
                                    placeholderText="Enter Email / Username"
                                    value={email}
                                    onChangeText={setEmail}
                                    isGrouped
                                />
                                <PasswordField
                                    label="Password"
                                    placeholderText="Enter Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    isGrouped
                                />
                                <Button
                                    variant="tertiary"
                                    size="small"
                                    iconBefore={<VerifiedUser />}
                                    style={storyStyles.generateButton}
                                >
                                    Generate Password
                                </Button>
                            </html.div>
                        </html.div>

                        <html.div style={storyStyles.section}>
                            <Text variant="caption" style={storyStyles.sectionTitle}>Authenticators</Text>
                            <html.div style={storyStyles.fieldGroup}>
                                <PasswordField
                                    label="Authenticator Secret Key"
                                    placeholderText="Enter Secret Key (TOTP)"
                                    value={totp}
                                    onChangeText={setTotp}
                                />
                            </html.div>
                        </html.div>

                        <html.div style={storyStyles.section}>
                            <Text variant="caption" style={storyStyles.sectionTitle}>Details</Text>
                            <InputField
                                label="Website"
                                placeholderText="Enter Website"
                                value={website}
                                onChangeText={setWebsite}
                            />
                        </html.div>
                    </html.div>
                </Dialog>
            </html.div>
        );
    },
};
