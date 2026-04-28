import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { Button } from './Button';
import { tokens } from '../../theme/tokens.css';
import { ButtonVariant } from './types';
import { AccountCircleFilled, KeyboardArrowLeftFilled, KeyboardArrowRightFilled } from '../../icons';
import { StoryScrollContainer } from '../../storybook/StoryScrollContainer';

const INCLUDE_PROPS = [
    'children',
    'variant',
    'size',
    'disabled',
    'isLoading',
    'fullWidth',
    'type',
    'aria-label',
    'onClick',
    'iconBefore',
    'iconAfter',
];

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: INCLUDE_PROPS,
        },
    },
    argTypes: {
        onClick: { action: 'clicked' },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'tertiaryAccent', 'destructive'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
        isLoading: { control: 'boolean' },
        iconBefore: { control: false },
        iconAfter: { control: false },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'tertiaryAccent', 'destructive'];
const storyStyles = css.create({
    stack: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing20,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing12,
    },
    sectionTitle: {
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize12,
        fontWeight: tokens.weightMedium,
        color: tokens.colorTextPrimary,
        textTransform: 'capitalize',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        gap: tokens.spacing20,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    cell: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing8,
        alignItems: 'center',
    },
    caption: {
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize12,
        color: tokens.colorTextSecondary,
        textTransform: 'capitalize',
    },
});

export const Playground: Story = {
    args: {
        children: 'Label',
        variant: 'primary',
        size: 'medium',
    },
};

export const VariantMatrix: Story = {
    args: { children: 'Label' },
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => (
        <html.div style={storyStyles.stack}>
            {variants.map((variant) => (
                <html.div key={variant} style={storyStyles.section}>
                    <html.div style={storyStyles.sectionTitle}>{variant}</html.div>
                    <html.div style={storyStyles.row}>
                        <html.div style={storyStyles.cell}>
                            <html.div style={storyStyles.caption}>default</html.div>
                            <Button variant={variant} size="medium">
                                Label
                            </Button>
                        </html.div>
                        <html.div style={storyStyles.cell}>
                            <html.div style={storyStyles.caption}>disabled</html.div>
                            <Button variant={variant} size="medium" disabled>
                                Label
                            </Button>
                        </html.div>
                    </html.div>
                </html.div>
            ))}
        </html.div>
    ),
};

export const IconVariants: Story = {
    args: { children: 'Leading icon' },
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => (
        <html.div style={storyStyles.stack}>
            <html.div style={storyStyles.section}>
                <html.div style={storyStyles.sectionTitle}>Icon Variants</html.div>
                <html.div style={storyStyles.row}>
                    <Button iconBefore={<KeyboardArrowLeftFilled />}>Left icon</Button>
                    <Button iconAfter={<KeyboardArrowRightFilled />}>Right icon</Button>
                    <Button aria-label="Account" size='medium' iconBefore={<AccountCircleFilled />} />
                </html.div>
            </html.div>
        </html.div>
    ),
};

export const IconAfterStates: Story = {
    args: { children: 'Label' },
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <StoryScrollContainer>
            <html.div style={storyStyles.stack}>
                {variants.map((variant) => (
                    <html.div key={variant} style={storyStyles.section}>
                        <html.div style={storyStyles.sectionTitle}>{variant}</html.div>
                        <html.div style={storyStyles.row}>
                            <html.div style={storyStyles.cell}>
                                <html.div style={storyStyles.caption}>default</html.div>
                                <Button variant={variant} iconAfter={<KeyboardArrowRightFilled />}>
                                    Label
                                </Button>
                            </html.div>
                            <html.div style={storyStyles.cell}>
                                <html.div style={storyStyles.caption}>disabled</html.div>
                                <Button variant={variant} iconAfter={<KeyboardArrowRightFilled />} disabled>
                                    Label
                                </Button>
                            </html.div>
                            <html.div style={storyStyles.cell}>
                                <html.div style={storyStyles.caption}>loading</html.div>
                                <Button variant={variant} iconAfter={<KeyboardArrowRightFilled />} isLoading>
                                    Label
                                </Button>
                            </html.div>
                            <html.div style={storyStyles.cell}>
                                <html.div style={storyStyles.caption}>icon only</html.div>
                                <Button variant={variant} iconAfter={<KeyboardArrowRightFilled />} aria-label="Next" />
                            </html.div>
                            <html.div style={storyStyles.cell}>
                                <html.div style={storyStyles.caption}>icon only disabled</html.div>
                                <Button variant={variant} iconAfter={<KeyboardArrowRightFilled />} aria-label="Next" disabled />
                            </html.div>
                        </html.div>
                    </html.div>
                ))}
            </html.div>
        </StoryScrollContainer>
    ),
};
