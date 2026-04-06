import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { NavbarListItem } from './NavbarListItem'

jest.mock('./NavbarListItem.styles', () => ({
  styles: {
    root: {},
    sizeSmall: {},
    sizeBig: {},
    selected: {},
    variantDefault: {},
    variantSecondary: {},
    variantDestructive: {},
    iconGroup: {},
    icon: {},
    iconSize: () => ({}),
    label: {},
    count: {},
    iconOnly: () => ({}),
    additionalItems: {}
  }
}))

jest.mock('./NavbarListItem.config', () => ({
  ICON_SIZE: 20,
  sizeStyleMap: {
    small: {},
    big: {}
  },
  variantStyleMap: {
    default: {},
    secondary: {},
    destructive: {}
  }
}))

const DummyIcon = ({ width, height }: { width?: number; height?: number }) => {
  void width
  void height
  return null
}

const SizedDummyIcon = ({
  width,
  height,
  size
}: {
  width?: number
  height?: number
  size?: number
}) => {
  void width
  void height
  void size
  return null
}

describe('NavbarListItem', () => {
  it('renders label correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<NavbarListItem label="All Items" />)
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with icon and count', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem icon={<DummyIcon />} label="All Items" count={49} />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with multiple icons and label', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem
          icon={
            <>
              <DummyIcon />
              <DummyIcon />
            </>
          }
          label="Security"
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('preserves explicitly passed icon dimensions', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem
          icon={<SizedDummyIcon width={8} height={5} />}
          label="Security"
        />
      )
    })

    const icon = component!.root.findByType(SizedDummyIcon)

    expect(icon.props.width).toBe(8)
    expect(icon.props.height).toBe(5)
  })

  it('preserves explicitly passed icon size prop', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem
          icon={<SizedDummyIcon size={14} />}
          label="Security"
        />
      )
    })

    const icon = component!.root.findByType(SizedDummyIcon)

    expect(icon.props.size).toBe(14)
    expect(icon.props.width).toBeUndefined()
    expect(icon.props.height).toBeUndefined()
  })

  it('renders icon only', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<NavbarListItem icon={<DummyIcon />} />)
    })

    const button = component!.root.findByType('button')
    expect(button.children.length).toBe(1)
  })

  it('renders label only', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<NavbarListItem label="Settings" />)
    })

    const button = component!.root.findByType('button')
    expect(button.children.length).toBe(1)
  })

  it('renders label with count', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem label="All Items" count={49} />
      )
    })

    const button = component!.root.findByType('button')
    expect(button.children.length).toBe(2)
  })

  it('triggers onClick when clicked', () => {
    const onClick = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem label="All Items" onClick={onClick} />
      )
    })

    const button = component!.root.findByType('button')
    act(() => {
      button.props.onClick?.({})
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies selected state correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<NavbarListItem label="All Items" selected />)
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const button = component!.root.findByType('button')
    expect(button.props['aria-selected']).toBe(true)
  })

  it('renders secondary variant', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem label="Logins" variant="secondary" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders destructive variant', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem label="Delete Item" variant="destructive" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with additionalItems', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <NavbarListItem
          icon={<DummyIcon />}
          label="All Items"
          count={49}
          additionalItems={<DummyIcon />}
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const button = component!.root.findByType('button')
    expect(button.children.length).toBe(4)
  })
})
