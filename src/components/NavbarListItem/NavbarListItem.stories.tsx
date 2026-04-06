import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { NavbarListItem } from './NavbarListItem'
import { useTheme } from '../../theme'
import { tokens } from '../../theme/tokens.css'
import type { NavbarListItemSize, NavbarListItemVariant } from './types'
import {
  AccountCircleFilled,
  AccountCircleOutlined,
  AccountCircleSharp,
  AccountCircleTone,
  AccountCircleRound,
  KeyboardArrowRightOutlined,
  Swap,
  VerifiedUser,
  MoreVert
} from '../../icons'

const INCLUDE_PROPS = ['label', 'count', 'selected', 'variant', 'size']

const meta = {
  title: 'Components/NavbarListItem',
  component: NavbarListItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: INCLUDE_PROPS
    }
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive']
    },
    size: {
      control: 'select',
      options: ['small', 'big']
    },
    label: { control: 'text' },
    count: { control: { type: 'number' } },
    icon: { control: false }
  }
} satisfies Meta<typeof NavbarListItem>

export default meta
type Story = StoryObj<typeof meta>

const variants: NavbarListItemVariant[] = ['default', 'secondary', 'destructive']
const sizes: NavbarListItemSize[] = ['small', 'big']

const storyStyles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 260,
    backgroundColor: 'transparent',
    padding: tokens.spacing8,
    borderRadius: tokens.radius8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderSecondary,
    overflow: 'hidden'
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    textTransform: 'capitalize'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacing24,
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary,
    textTransform: 'capitalize'
  },
  disclosureIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotate(90deg)'
  }
})

const MultipleIconsExample = () => {
  const { theme } = useTheme()

  return (
    <html.div style={storyStyles.container}>
      <NavbarListItem
        label="Security"
        size="small"
        icon={
          <>
            <KeyboardArrowRightOutlined color={theme.colors.colorTextSecondary} />
            <VerifiedUser color={theme.colors.colorTextPrimary} />
          </>
        }
      />
      <NavbarListItem
        label="Syncing"
        size="small"
        icon={
          <>
            <KeyboardArrowRightOutlined color={theme.colors.colorTextSecondary} />
            <Swap color={theme.colors.colorTextSecondary} />
          </>
        }
        variant="secondary"
      />
    </html.div>
  )
}

export const Playground: Story = {
  args: {
    label: 'All Items',
    count: 49,
    selected: false,
    variant: 'default'
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <NavbarListItem {...args} icon={<AccountCircleFilled />} />
    </html.div>
  )
}

export const VariantMatrix: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      {variants.map((variant) => (
        <html.div key={variant} style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>{variant}</html.div>
          <html.div style={storyStyles.row}>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>default</html.div>
              <html.div style={storyStyles.container}>
                <NavbarListItem
                  icon={<AccountCircleFilled />}
                  label="All Items"
                  count={49}
                  variant={variant}
                />
              </html.div>
            </html.div>
            <html.div style={storyStyles.cell}>
              <html.div style={storyStyles.caption}>selected</html.div>
              <html.div style={storyStyles.container}>
                <NavbarListItem
                  icon={<AccountCircleFilled />}
                  label="All Items"
                  count={49}
                  variant={variant}
                  selected
                />
              </html.div>
            </html.div>
          </html.div>
        </html.div>
      ))}
    </html.div>
  )
}

export const ContentCombinations: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Content variations</html.div>
        <html.div style={storyStyles.row}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              icon + label + count
            </html.div>
            <html.div style={storyStyles.container}>
              <NavbarListItem
                icon={<AccountCircleFilled />}
                label="All Items"
                count={49}
              />
            </html.div>
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>icon + label</html.div>
            <html.div style={storyStyles.container}>
              <NavbarListItem icon={<AccountCircleFilled />} label="Settings" />
            </html.div>
          </html.div>
        </html.div>
        <html.div style={storyStyles.row}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>label + count</html.div>
            <html.div style={storyStyles.container}>
              <NavbarListItem label="All Items" count={49} />
            </html.div>
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>label only</html.div>
            <html.div style={storyStyles.container}>
              <NavbarListItem label="Lock App" />
            </html.div>
          </html.div>
        </html.div>
        <html.div style={storyStyles.row}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>icon only</html.div>
            <NavbarListItem icon={<AccountCircleFilled />} />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}

export const DesktopNavbar: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.container}>
      <NavbarListItem
        icon={<AccountCircleFilled />}
        label="All Items"
        count={49}
        selected
      />
      <NavbarListItem
        icon={<AccountCircleOutlined />}
        label="Logins"
        count={23}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleSharp />}
        label="Credit Card"
        count={4}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleTone />}
        label="Identities"
        count={2}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleRound />}
        label="Notes"
        count={6}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleOutlined />}
        label="Recovery Phrases"
        count={3}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleSharp />}
        label="Wi-Fi"
        count={8}
        variant="secondary"
      />
      <NavbarListItem
        icon={<AccountCircleTone />}
        label="Other"
        count={3}
        variant="secondary"
      />
    </html.div>
  )
}

export const WithAdditionalItems: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>
          With additional items
        </html.div>
        <html.div style={storyStyles.container}>
          <NavbarListItem
            icon={<AccountCircleFilled />}
            label="All Items"
            count={49}
            selected
            additionalItems={<MoreVert />}
          />
          <NavbarListItem
            icon={<AccountCircleOutlined />}
            label="Logins"
            count={23}
            variant="secondary"
            additionalItems={<MoreVert />}
          />
          <NavbarListItem
            icon={<AccountCircleSharp />}
            label="Credit Cards"
            count={4}
            variant="secondary"
            additionalItems={<MoreVert />}
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const SizeMatrix: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      {sizes.map((size) => (
        <html.div key={size} style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>{size}</html.div>
          <html.div style={storyStyles.container}>
            <NavbarListItem
              icon={<AccountCircleFilled />}
              label="Settings"
              size={size}
            />
            <NavbarListItem
              icon={<AccountCircleOutlined />}
              label="Appearance"
              variant="secondary"
              size={size}
            />
          </html.div>
        </html.div>
      ))}
    </html.div>
  )
}

export const WithMultipleIcons: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => <MultipleIconsExample />
}

export const WithActions: Story = {
  args: { label: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>
          Navbar with actions
        </html.div>
        <html.div style={storyStyles.container}>
          <NavbarListItem icon={<AccountCircleFilled />} label="Rename" />
          <NavbarListItem
            icon={<AccountCircleOutlined />}
            label="Manage Members"
          />
          <NavbarListItem
            icon={<AccountCircleSharp />}
            label="Delete"
            variant="destructive"
          />
        </html.div>
      </html.div>

      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Mixed list</html.div>
        <html.div style={storyStyles.container}>
          <NavbarListItem
            icon={<AccountCircleFilled />}
            label="Authenticator"
            selected
          />
          <NavbarListItem
            icon={<AccountCircleOutlined />}
            label="Settings"
            variant="secondary"
          />
          <NavbarListItem
            icon={<AccountCircleSharp />}
            label="Lock App"
            variant="secondary"
          />
        </html.div>
      </html.div>
    </html.div>
  )
}
