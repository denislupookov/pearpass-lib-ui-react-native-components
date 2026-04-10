import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { html, css } from 'react-strict-dom'
import { SelectField } from './SelectField'
import { tokens } from '../../theme/tokens.css'
import {
  DoneAll,
  AccountCircleOutlined,
  ExpandMore,
} from '../../icons'

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
  decorators: [
    (Story, context) => {
      if (context.name === 'VariantMatrix') {
        return <Story />
      }
      return (
        <html.div style={storyStyles.previewContainer}>
          <Story />
        </html.div>
      )
    },
  ],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  }
}

export default meta
type Story = StoryObj<typeof SelectField>

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    flex: 1,
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
    paddingBottom: tokens.spacing8
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
    gap: tokens.spacing8
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary
  },
  previewContainer: {
    maxWidth: '400px',
    width: '100%',
  }
})

export const Default: Story = {
  args: {
    label: 'Country',
    value: '',
    placeholder: 'Select a country...',
    rightSlot: <ExpandMore color={tokens.colorTextPrimary} />,
    onClick: () => {}
  }
}

export const WithValue: Story = {
  args: {
    label: 'Country',
    value: 'United States',
    rightSlot: <ExpandMore color={tokens.colorTextPrimary} />,
    onClick: () => {}
  }
}

export const ErrorState: Story = {
  args: {
    label: 'Language',
    value: '',
    placeholder: 'Choose a language...',
    error: 'Please select a valid language.',
    rightSlot: <ExpandMore color={tokens.colorTextPrimary} />,
    onClick: () => {}
  }
}

export const WithSlots: Story = {
  args: {
    label: 'Account',
    value: 'Personal Checking',
    leftSlot: <AccountCircleOutlined color={tokens.colorTextPrimary} />,
    rightSlot: <ExpandMore color={tokens.colorTextPrimary} />,
    onClick: () => {}
  }
}

export const Disabled: Story = {
  args: {
    label: 'Currency',
    value: 'USD',
    disabled: true,
    rightSlot: <ExpandMore color={tokens.colorTextDisabled} />,
    onClick: () => {}
  }
}

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Default Variant</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Empty / Placeholder</html.div>
            <SelectField
              label="Country"
              value=""
              placeholder="Select a country..."
              rightSlot={<ExpandMore color={tokens.colorTextPrimary} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Value</html.div>
            <SelectField
              label="Country"
              value="Canada"
              rightSlot={<ExpandMore color={tokens.colorTextPrimary} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Left Slot</html.div>
            <SelectField
              label="User Setup"
              value="Admin"
              leftSlot={<AccountCircleOutlined color={tokens.colorTextPrimary} />}
              rightSlot={<ExpandMore color={tokens.colorTextPrimary} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Disabled</html.div>
            <SelectField
              label="Region"
              value="North America"
              disabled
              rightSlot={<ExpandMore color={tokens.colorTextDisabled} />}
              onClick={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>

      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>States</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              Error without message
            </html.div>
            <SelectField
              label="Timezone"
              value="Invalid Timezone"
              error=""
              rightSlot={<ExpandMore color={tokens.colorTextPrimary} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with message</html.div>
            <SelectField
              label="Timezone"
              value="Mars/Deimos"
              error="Timezone is not recognized."
              rightSlot={<ExpandMore color={tokens.colorSurfaceError} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with Error Icon</html.div>
            <SelectField
              label="Selection Required"
              value=""
              placeholder="Select option..."
              error="You must make a selection"
              rightSlot={<DoneAll color={tokens.colorSurfaceError} />}
              onClick={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}
