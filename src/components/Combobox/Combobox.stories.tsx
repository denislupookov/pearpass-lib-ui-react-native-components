import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { Combobox } from './Combobox'
import { tokens } from '../../theme/tokens.css'
import {
  AccountCircleFilled,
  AccountCircleOutlined,
  AccountCircleSharp,
  AccountCircleTone,
} from '../../icons'

const SAMPLE_ITEMS = [
  { id: '1', title: 'Microsoft 365', subtitle: 'simon.j@gmail.com', icon: <AccountCircleFilled /> },
  { id: '2', title: 'Slack', subtitle: 'acme.1994@gmail.com', icon: <AccountCircleOutlined /> },
  { id: '3', title: 'GitHub', subtitle: 'acme.1994@gmail.com', icon: <AccountCircleSharp /> },
  { id: '4', title: 'Adobe', subtitle: 'simon.j@gmail.com', icon: <AccountCircleTone /> },
  { id: '5', title: 'Amazon', subtitle: 'acme.oc14@outlook.com', icon: <AccountCircleFilled /> },
]

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['label', 'placeholder', 'disabled', 'error', 'searchPlaceholder', 'emptyText']
    }
  },
  argTypes: {
    items: { control: false },
    onSelect: { action: 'onSelect' },
    onSearchChange: { action: 'onSearchChange' },
    onClear: { action: 'onClear' },
    onOpenChange: { action: 'onOpenChange' },
  }
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    textTransform: 'capitalize',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
  previewContainer: {
    maxWidth: '400px',
    width: '100%',
  },
})

const ComboboxControlled = (props: Partial<React.ComponentProps<typeof Combobox>>) => {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | undefined>(props.selectedId)
  const [value, setValue] = useState(props.value ?? '')

  const items = (props.items ?? SAMPLE_ITEMS).filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id: string) => {
    const found = (props.items ?? SAMPLE_ITEMS).find((i) => i.id === id)
    setSelectedId(id)
    setValue(found?.title ?? '')
    setSearch('')
    props.onSelect?.(id)
  }

  const handleClear = () => {
    setSelectedId(undefined)
    setValue('')
    setSearch('')
    props.onClear?.()
  }

  return (
    <Combobox
      label={props.label ?? 'Account'}
      placeholder={props.placeholder ?? 'Select an account...'}
      searchPlaceholder={props.searchPlaceholder}
      emptyText={props.emptyText}
      disabled={props.disabled}
      error={props.error}
      items={items}
      selectedId={selectedId}
      value={value}
      searchValue={search}
      onSearchChange={setSearch}
      onSelect={handleSelect}
      onClear={value ? handleClear : undefined}
    />
  )
}

export const Playground: Story = {
  args: {
    label: 'Account',
    placeholder: 'Select an account...',
    searchPlaceholder: 'Search...',
    emptyText: 'No results',
    disabled: false,
    error: undefined,
    items: SAMPLE_ITEMS,
    selectedId: undefined,
    value: '',
    searchValue: '',
    onSelect: () => {},
    onSearchChange: () => {},
  },
  decorators: [
    (Story) => (
      <html.div style={storyStyles.previewContainer}>
        <Story />
      </html.div>
    ),
  ],
  render: (args) => <ComboboxControlled {...args} />,
}

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <ComboboxControlled label="Account" placeholder="Select an account..." />
    </html.div>
  ),
}

export const WithSelectedValue: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <ComboboxControlled
        label="Account"
        selectedId="2"
        value="Slack"
      />
    </html.div>
  ),
}

export const ErrorState: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <ComboboxControlled
        label="Account"
        placeholder="Select an account..."
        error="Please select a valid account."
      />
    </html.div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <ComboboxControlled
        label="Account"
        value="Microsoft 365"
        selectedId="1"
        disabled
      />
    </html.div>
  ),
}

export const EmptySearchResults: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <Combobox
        label="Account"
        placeholder="Select an account..."
        items={[]}
        searchValue="xyz"
        onSearchChange={() => {}}
        onSelect={() => {}}
        emptyText="No accounts found"
        open
      />
    </html.div>
  ),
}

export const WithoutIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.previewContainer}>
      <ComboboxControlled
        label="Country"
        placeholder="Select a country..."
        items={[
          { id: 'us', title: 'United States', subtitle: 'North America' },
          { id: 'gb', title: 'United Kingdom', subtitle: 'Europe' },
          { id: 'de', title: 'Germany', subtitle: 'Europe' },
          { id: 'fr', title: 'France', subtitle: 'Europe' },
          { id: 'jp', title: 'Japan', subtitle: 'Asia' },
        ]}
      />
    </html.div>
  ),
}

export const VariantMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>States</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Empty / Placeholder</html.div>
            <ComboboxControlled label="Account" placeholder="Select an account..." />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Selected Value</html.div>
            <ComboboxControlled label="Account" selectedId="1" value="Microsoft 365" />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Disabled</html.div>
            <ComboboxControlled label="Account" value="Slack" selectedId="2" disabled />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error</html.div>
            <ComboboxControlled
              label="Account"
              placeholder="Select an account..."
              error="Please select a valid account."
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  ),
}
