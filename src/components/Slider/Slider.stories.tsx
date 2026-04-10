import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'

import { Slider } from './Slider'
import { tokens } from '../../theme/tokens.css'
import { Text } from '../Text'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['value', 'minimumValue', 'maximumValue', 'step', 'disabled']
    }
  },
  argTypes: {
    value: { control: 'number' },
    minimumValue: { control: 'number' },
    maximumValue: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'changed' }
  }
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  stack: {
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing20
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  caption: {
    color: tokens.colorTextSecondary
  }
})

export const Playground: Story = {
  args: {
    value: 32,
    minimumValue: 4,
    maximumValue: 64,
    step: 1,
    disabled: false,
    'aria-label': 'Password length'
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? 32)

    React.useEffect(() => {
      setValue(args.value ?? 32)
    }, [args.value])

    return (
      <html.div style={storyStyles.stack}>
        <Text variant="caption" style={storyStyles.caption}>
          {value}
        </Text>
        <Slider
          {...args}
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue)
            args.onValueChange?.(nextValue)
          }}
        />
      </html.div>
    )
  }
}

export const States: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const [value, setValue] = React.useState(24)

    return (
      <html.div style={storyStyles.stack}>
        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.caption}>
            Interactive
          </Text>
          <Slider
            value={value}
            minimumValue={4}
            maximumValue={64}
            step={1}
            onValueChange={setValue}
            aria-label="Interactive slider"
          />
        </html.div>

        <html.div style={storyStyles.section}>
          <Text variant="caption" style={storyStyles.caption}>
            Disabled
          </Text>
          <Slider
            value={18}
            minimumValue={4}
            maximumValue={64}
            step={1}
            disabled
            aria-label="Disabled slider"
          />
        </html.div>
      </html.div>
    )
  }
}
