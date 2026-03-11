import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { ToggleSwitch } from './ToggleSwitch'
import { tokens } from '../../theme/tokens.css'
import { Text } from '../Text'

const INCLUDE_PROPS = [
  'checked',
  'label',
  'description',
  'disabled',
  'onChange'
]

const meta = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: INCLUDE_PROPS
    }
  },
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof ToggleSwitch>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing20
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  sectionTitle: {
    color: tokens.colorTextSecondary,
    textTransform: 'capitalize'
  }
})

export const Playground: Story = {
  args: {
    label: 'Label',
    description: 'Supporting description text',
    checked: false,
    disabled: false
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked ?? false)
    React.useEffect(() => {
      setChecked(args.checked ?? false)
    }, [args.checked])
    return (
      <ToggleSwitch
        {...args}
        checked={checked}
        onChange={(next) => {
          setChecked(next)
          args.onChange?.(next)
        }}
      />
    )
  }
}

export const States: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const [on, setOn] = React.useState(false)
    const [onDisabled] = React.useState(true)

    return (
      <html.div style={storyStyles.stack}>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            Interactive
          </Text>
          <ToggleSwitch
            checked={on}
            onChange={setOn}
            label="Notifications"
            description="Receive push notifications"
          />
        </html.div>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            Off (static)
          </Text>
          <ToggleSwitch
            checked={false}
            label="Notifications"
            description="Receive push notifications"
          />
        </html.div>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            On (static)
          </Text>
          <ToggleSwitch
            checked={true}
            label="Notifications"
            description="Receive push notifications"
          />
        </html.div>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            Disabled off
          </Text>
          <ToggleSwitch
            checked={false}
            disabled
            label="Notifications"
            description="Receive push notifications"
          />
        </html.div>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            Disabled on
          </Text>
          <ToggleSwitch
            checked={onDisabled}
            disabled
            label="Notifications"
            description="Receive push notifications"
          />
        </html.div>
      </html.div>
    )
  }
}

export const LabelVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const [withLabel, setWithLabel] = React.useState(false)
    const [noLabel, setNoLabel] = React.useState(false)

    return (
      <html.div style={storyStyles.stack}>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            Label only
          </Text>
          <ToggleSwitch
            checked={withLabel}
            onChange={setWithLabel}
            label="Dark mode"
          />
        </html.div>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.sectionTitle}>
            No label
          </Text>
          <ToggleSwitch
            checked={noLabel}
            onChange={setNoLabel}
            aria-label="Toggle feature"
          />
        </html.div>
      </html.div>
    )
  }
}
