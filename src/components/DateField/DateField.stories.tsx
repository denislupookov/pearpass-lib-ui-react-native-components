import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { html, css } from 'react-strict-dom'

import { DateField } from './DateField'
import { tokens } from '../../theme/tokens.css'
import { PICKER_MODE } from './constants'

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    pickerMode: {
      control: { type: 'select' },
      options: Object.values(PICKER_MODE)
    },
    onChangeText: { control: false },
    onChangeDate: { control: false },
    rightSlot: { control: false },
    leftSlot: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof DateField>

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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
  }
})

const ControlledDateField = (args: React.ComponentProps<typeof DateField>) => {
  const [value, setValue] = React.useState(args.value ?? '')

  React.useEffect(() => {
    setValue(args.value ?? '')
  }, [args.value])

  return (
    <DateField
      {...args}
      value={value}
      onChangeText={setValue}
    />
  )
}

export const Default: Story = {
  render: (args) => <ControlledDateField {...args} />,
  args: {
    label: 'Date of birth',
    value: '',
    placeholder: 'DD/MM/YYYY',
    pickerMode: 'date'
  }
}

export const WithValue: Story = {
  render: (args) => <ControlledDateField {...args} />,
  args: {
    label: 'Date of issue',
    value: '21/08/2026',
    pickerMode: 'date'
  }
}

export const MonthYear: Story = {
  render: (args) => <ControlledDateField {...args} />,
  args: {
    label: 'Expiry date',
    value: '08 / 28',
    placeholder: 'MM / YY',
    pickerMode: 'month-year'
  }
}

export const Disabled: Story = {
  render: (args) => <ControlledDateField {...args} />,
  args: {
    label: 'Reminder date',
    value: '21/08/2026',
    disabled: true,
    pickerMode: 'date'
  }
}

export const ErrorState: Story = {
  render: (args) => <ControlledDateField {...args} />,
  args: {
    label: 'Start date',
    value: '32/15/2026',
    error: 'Enter a valid date.',
    pickerMode: 'date'
  }
}

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Common Date Patterns</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Date</html.div>
            <ControlledDateField
              label="Date of birth"
              value=""
              placeholder="DD/MM/YYYY"
              pickerMode="date"
            />
          </html.div>

          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Time</html.div>
            <ControlledDateField
              label="Reminder time"
              value="14:30"
              placeholder="HH:MM"
              pickerMode="time"
            />
          </html.div>

          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Datetime</html.div>
            <ControlledDateField
              label="Event starts"
              value="21/08/2026 14:30"
              placeholder="DD/MM/YYYY HH:MM"
              pickerMode="datetime"
            />
          </html.div>

          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Month / year</html.div>
            <ControlledDateField
              label="Card expiry"
              value="08 / 28"
              placeholder="MM / YY"
              pickerMode="month-year"
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}
