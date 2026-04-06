import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ListItem } from './ListItem'

jest.mock('../Pressable', () => ({
  Pressable: ({ children, 'data-testid': dataTestId, onClick, onPressIn, onPressOut, onLongPress, delayLongPress, ...rest }: {
    children?: React.ReactNode
    'data-testid'?: string
    onClick?: () => void
    onPressIn?: () => void
    onPressOut?: () => void
    onLongPress?: () => void
    delayLongPress?: number
    [key: string]: unknown
  }) => {
    void onPressIn; void onPressOut; void onLongPress; void delayLongPress
    return <div data-testid={dataTestId} onClick={onClick} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
  }
}))

jest.mock('./ListItem.styles', () => ({
  styles: {
    root: {},
    iconContainer: {},
    iconSize: () => ({}),
    content: {},
    title: {},
    subtitle: {},
    subtitleDividerContainer: {},
    subtitleSegment: {},
    dividerLine: {},
    subtitleDividerContainerVertical: {},
    dividerLineHorizontal: {},
    rightContainer: {},
    mobile: {},
    selected: {},
    showDivider: {},
    variantDefault: {},
    variantDestructive: {},
    iconAlignTop: {}
  }
}))

jest.mock('./ListItem.config', () => ({
  ICON_SIZE: 32,
  variantStyleMap: {
    default: {},
    destructive: {}
  }
}))

jest.mock('../Checkbox/Checkbox', () => ({
  Checkbox: ({ checked, onChange }: { checked?: boolean; onChange?: () => void }) => (
    <button role="checkbox" aria-checked={checked} onClick={onChange} />
  )
}))

jest.mock('../Text/Text.styles', () => ({
  styles: {
    textBase: {},
    variantLabel: {},
    variantBody: {},
    variantBodyEmphasized: {},
    variantCaption: {}
  }
}))

const DummyIcon = ({ width, height }: { width?: number; height?: number }) => {
  void width
  void height
  return null
}

const DummyButton = () => <button>Action</button>

describe('ListItem', () => {
  it('renders title correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ListItem title="My Item" />)
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with icon', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem icon={<DummyIcon />} title="My Item" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with string subtitle', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem title="My Item" subtitle="Some subtitle" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with object subtitle (primary + secondary)', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          title="My Item"
          subtitle={{ primary: 'user@email.com', secondary: 'Updated today' }}
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with right element', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem title="My Item" rightElement={<DummyButton />} />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders title only without icon or subtitle', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ListItem title="Title Only" />)
    })

    const root = component!.root.findByType('div')
    // root > content > title
    const contentDiv = root.children[0]
    expect(typeof contentDiv).toBe('object')
  })

  it('renders icon, title, subtitle, and right element together', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Full Item"
          subtitle="Details here"
          rightElement={<DummyButton />}
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem title="My Item" testID="list-item-1" />
      )
    })

    const root = component!.root.findByType('div')
    expect(root.props['data-testid']).toBe('list-item-1')
  })

  it('does not render icon container when icon is not provided', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ListItem title="No Icon" />)
    })

    const root = component!.root.findByType('div')
    // Should have only content div (no icon span, no right container)
    expect(root.children.length).toBe(1)
  })

  it('does not render right container when rightElement is not provided', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ListItem title="No Right" />)
    })

    const root = component!.root.findByType('div')
    expect(root.children.length).toBe(1)
  })

  it('renders icon and right element together', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="With Both"
          rightElement={<DummyButton />}
        />
      )
    })

    const root = component!.root.findByType('div')
    // icon span + content div + right container div
    expect(root.children.length).toBe(3)
  })

  it('renders with custom iconSize', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem icon={<DummyIcon />} iconSize={48} title="Custom Icon Size" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with showDivider', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem title="With Divider" showDivider />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders vertical subtitle layout', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          title="Vertical"
          subtitle={{ primary: 'Top', secondary: 'Bottom' }}
          subtitleLayout="vertical"
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('applies selected state correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem title="Selected Item" selected />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders object subtitle with divider', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          title="Divided"
          subtitle={{ primary: 'Left', secondary: 'Right' }}
        />
      )
    })

    const tree = component!.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with destructive variant', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Delete Account"
          subtitle="This action cannot be undone"
          variant="destructive"
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with iconAlign top', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Top Aligned"
          subtitle={{ primary: 'Primary', secondary: 'Secondary' }}
          subtitleLayout="vertical"
          iconAlign="top"
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with selectionMode multi', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Selectable Item"
          subtitle="user@example.com"
          selectionMode="multi"
          isSelected={false}
          onSelect={() => {}}
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with selectionMode multi and isSelected true', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Selected Item"
          selectionMode="multi"
          isSelected={true}
          onSelect={() => {}}
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('does not render checkbox when selectionMode is none', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ListItem
          icon={<DummyIcon />}
          title="Normal Item"
          selectionMode="none"
        />
      )
    })

    const root = component!.root.findByType('div')
    const checkboxes = root.findAllByProps({ role: 'checkbox' })
    expect(checkboxes.length).toBe(0)
  })
})
