import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { html, css } from 'react-strict-dom';
import { AlertMessage } from './AlertMessage';
import ReportProblemRound from '../../icons/components/ReportProblemRound';
import VerifiedUser from '../../icons/components/VerifiedUser';
import ErrorFilled from '../../icons/components/ErrorFilled';
import { tokens } from '../../theme/tokens.css';

const meta: Meta<typeof AlertMessage> = {
  title: 'Components/AlertMessage',
  component: AlertMessage,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'big'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AlertMessage>;

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacing20,
    flexWrap: 'wrap',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8,
    flex: 1,
    minWidth: '300px',
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary,
  },
});

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'small',
    title: 'Warning',
    description: "Don't forget your Master password. It's the only way to access your vault. We can't help recover it. Back it up securely.",
    icon: <ReportProblemRound width={16} height={16} />,
  },
};

export const SmallSuccess: Story = {
  args: {
    variant: 'success',
    size: 'small',
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    icon: <VerifiedUser width={16} height={16} />,
  },
};

export const MediumError: Story = {
  args: {
    variant: 'error',
    size: 'medium',
    title: 'Operation Failed',
    description: 'There was an error saving your changes. Please try again.',
    icon: <ErrorFilled width={16} height={16} />,
  },
};

export const BigSuccess: Story = {
  args: {
    variant: 'success',
    size: 'big',
    title: 'Operation Successful',
    description: 'Your changes have been saved successfully.',
    icon: <VerifiedUser width={16} height={16} />,
  },
};

export const WithAction: Story = {
  args: {
    variant: 'error',
    size: 'medium',
    title: 'Operation Failed',
    description: 'There was an error saving your changes.',
    icon: <ErrorFilled width={16} height={16} />,
    actionText: 'Retry',
    onAction: () => console.log('Retry clicked!'),
  },
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Small</html.div>
        <html.div style={storyStyles.row}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Success</html.div>
            <AlertMessage variant="success" size="small" title="" description="Small success message." icon={<VerifiedUser width={16} height={16} />} />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Warning</html.div>
            <AlertMessage variant="warning" size="small" title="" description="Don't forget your Master password. It's the only way to access your vault." icon={<ReportProblemRound width={16} height={16} />} />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error</html.div>
            <AlertMessage variant="error" size="small" title="" description="Small error message." icon={<ErrorFilled width={16} height={16} />} />
          </html.div>
        </html.div>
      </html.div>

      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Medium</html.div>
        <html.div style={storyStyles.row}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Success</html.div>
            <AlertMessage variant="success" size="medium" title="Success" description="Medium success message." icon={<VerifiedUser width={16} height={16} />} />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Warning</html.div>
            <AlertMessage variant="warning" size="medium" title="Warning" description="Medium warning message." icon={<ReportProblemRound width={16} height={16} />} />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with Action</html.div>
            <AlertMessage variant="error" size="medium" title="Error" description="Medium error with action." icon={<ErrorFilled width={16} height={16} />} actionText="Retry" onAction={() => { }} />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  ),
};
