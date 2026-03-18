import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { css, html } from 'react-strict-dom';
import { PasswordField } from './PasswordField';
import { tokens } from '../../theme/tokens.css';
import { AlertMessage } from '../AlertMessage';
import { Button } from '../Button';
import { Text } from '../Text';
import { Title } from '../Title';
import ReportProblemRound from '../../icons/components/ReportProblemRound';
import { StoryScrollContainer } from '../../storybook/StoryScrollContainer';

const meta: Meta<typeof PasswordField> = {
  title: 'Components/PasswordField',
  component: PasswordField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholderText: { control: 'text' },
    errorMessage: { control: 'text' },
    passwordIndicator: {
      control: { type: 'select' },
      options: ['vulnerable', 'decent', 'strong', 'match'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary,
    paddingBottom: tokens.spacing8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridAutoRows: 'minmax(100px, auto)',
    gap: tokens.spacing20,
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8,
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary,
  },
  infoBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    height: 200,
    justifyContent: 'flex-start',
  },
});

export const Default: Story = {
  args: {
    label: 'Password',
    value: '',
    placeholderText: 'Enter password',
    variant: 'default',
    onChangeText: () => { },
  },
};

export const WithValue: Story = {
  args: {
    label: 'Password',
    value: 'secret123',
    variant: 'default',
    onChangeText: () => { },
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Password',
    value: 'short',
    variant: 'error',
    errorMessage: 'Password must be at least 8 characters.',
    onChangeText: () => { },
  },
};

export const WithInfoBox: Story = {
  args: {
    label: 'Password',
    value: '',
    placeholderText: 'Enter password',
    variant: 'default',
    onChangeText: () => { },
    infoBox: 'Strong passwords are usually at least 8 characters long, hard to guess, use a mix of letters, numbers, and symbols, and aren’t based on personal information.',
  },
  decorators: [
    (Story) => (
      <html.div style={storyStyles.infoBoxWrapper}>
        <Story />
      </html.div>
    ),
  ],
};

export const WithPasswordIndicator: Story = {
  args: {
    label: 'Password',
    value: 'P@ssword123',
    variant: 'default',
    passwordIndicator: 'strong',
    onChangeText: () => { },
  },
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <StoryScrollContainer>
      <html.div style={storyStyles.container}>
        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Default Variant</html.div>
          <html.div style={storyStyles.grid}>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Empty / Placeholder</html.div>
              <PasswordField
                label="Password"
                value=""
                placeholderText="Enter password"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>With Value</html.div>
              <PasswordField
                label="Password"
                value="secret123"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Indicator: Vulnerable</html.div>
              <PasswordField
                label="Password"
                value="short"
                passwordIndicator="vulnerable"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Indicator: Decent</html.div>
              <PasswordField
                label="Password"
                value="password"
                passwordIndicator="decent"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Indicator: Strong</html.div>
              <PasswordField
                label="Password"
                value="P@ssword123!"
                passwordIndicator="strong"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Indicator: Match</html.div>
              <PasswordField
                label="Confirm Password"
                value="secret123"
                passwordIndicator="match"
                onChangeText={() => { }}
              />
            </html.div>
          </html.div>
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Error Variant</html.div>
          <html.div style={storyStyles.grid}>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Error without message</html.div>
              <PasswordField
                label="Password"
                value="wrong"
                variant="error"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Error with message</html.div>
              <PasswordField
                label="Password"
                value="wrong"
                variant="error"
                errorMessage="Invalid credentials"
                onChangeText={() => { }}
              />
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>Error with Indicator</html.div>
              <PasswordField
                label="Password"
                value="short"
                variant="error"
                errorMessage="Password is too weak"
                passwordIndicator="vulnerable"
                onChangeText={() => { }}
              />
            </html.div>
          </html.div>
        </html.div>
      </html.div>
    </StoryScrollContainer>
  ),
};

const formStyles = css.create({
  container: {
    maxWidth: '400px',
  },
  flexCol24: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
  },
  flexCol16: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
  },
  flexCol8: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export const PasswordForm: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <html.div style={[storyStyles.container, formStyles.container]}>
      <html.div style={formStyles.flexCol24}>

        <html.div style={formStyles.flexCol8}>
          <Title as="h2">Create master password</Title>
          <Text variant="body" as="p">Create the master password</Text>
        </html.div>

        <html.div style={formStyles.flexCol16}>
          <PasswordField
            label="Password"
            value="P@ssword123!"
            passwordIndicator="strong"
            onChangeText={() => { }}
          />
          <PasswordField
            label="Repeat password"
            value="P@ssword123!"
            passwordIndicator="match"
            onChangeText={() => { }}
          />
        </html.div>

        <AlertMessage
          variant="warning"
          size="small"
          title="Important"
          description="Don't forget your Master password. It's the only way to access your vault. We can't help recover it. Back it up securely."
          icon={<ReportProblemRound width={16} height={16} />}
        />

        <Text variant="caption" style={formStyles.textCenter}>
          By clicking continue confirm that you have read and agreed to pair pass application terms of use
        </Text>

        <Button variant="primary">
          Continue
        </Button>

      </html.div>
    </html.div>
  ),
};
