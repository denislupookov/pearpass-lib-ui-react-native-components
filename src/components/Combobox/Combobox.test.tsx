import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Combobox } from './Combobox'

jest.mock('./Combobox.styles', () => ({
  styles: {
    header: {},
    rightSlot: {},
    chevron: {},
    chevronOpen: {},
    searchPaddingWeb: {},
    searchPaddingNative: {},
    itemsList: {},
    emptyState: {},
  },
}))

jest.mock('../ContextMenu', () => ({
  ContextMenu: ({
    trigger,
    children,
    open,
    onOpenChange,
    testID,
  }: {
    trigger: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    testID?: string
  }) => (
    <div data-testid={testID}>
      <div
        data-testid="context-menu-trigger"
        onClick={() => onOpenChange?.(!open)}
      >
        {trigger}
      </div>
      {open && (
        <div data-testid="context-menu-content">{children}</div>
      )}
    </div>
  ),
}))

jest.mock('../ListItem', () => ({
  ListItem: ({
    title,
    subtitle,
    selected,
    onClick,
    testID,
  }: {
    title: string
    subtitle?: string
    selected?: boolean
    onClick?: () => void
    testID?: string
  }) => (
    <div
      data-testid={testID}
      aria-selected={selected}
      onClick={onClick}
    >
      {title}
      {subtitle && <span>{subtitle}</span>}
    </div>
  ),
}))

jest.mock('../InputField', () => ({
  InputField: ({
    placeholder,
    value,
    onChangeText,
  }: {
    placeholder?: string
    value?: string
    onChangeText?: (v: string) => void
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => onChangeText?.(e.target.value)}
    />
  ),
}))

jest.mock('../SelectField', () => ({
  SelectField: ({
    label,
    value,
    placeholder,
    rightSlot,
  }: {
    label?: string
    value?: string
    placeholder?: string
    rightSlot?: React.ReactNode
  }) => (
    <div data-testid="select-field">
      {label && <span>{label}</span>}
      <span>{value || placeholder}</span>
      {rightSlot}
    </div>
  ),
}))

jest.mock('../Button', () => ({
  Button: ({
    'aria-label': ariaLabel,
    onClick,
    children,
  }: {
    'aria-label'?: string
    onClick?: (e: React.MouseEvent) => void
    children?: React.ReactNode
  }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  ),
}))

jest.mock('../Text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}))

jest.mock('../../icons', () => ({
  Close: () => null,
  KeyboardArrowBottom: () => null,
}))

jest.mock('../../theme', () => ({
  useTheme: () => ({
    theme: { colors: { colorTextPrimary: '#000' } },
  }),
}))

const defaultItems = [
  { id: '1', title: 'Apple' },
  { id: '2', title: 'Banana', subtitle: 'Yellow fruit' },
  { id: '3', title: 'Cherry' },
]

const defaultProps = {
  label: 'Fruit',
  items: defaultItems,
  onSelect: jest.fn(),
  searchValue: '',
  onSearchChange: jest.fn(),
}

describe('Combobox', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders trigger correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<Combobox {...defaultProps} />)
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('does not show menu when closed', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<Combobox {...defaultProps} />)
    })

    const menu = component!.root.findAll(
      (n) => n.props['data-testid'] === 'context-menu-content'
    )
    expect(menu.length).toBe(0)
  })

  it('opens menu on trigger click', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<Combobox {...defaultProps} />)
    })

    const trigger = component!.root.findByProps({
      'data-testid': 'context-menu-trigger',
    })

    act(() => {
      trigger.props.onClick()
    })

    const menu = component!.root.findByProps({
      'data-testid': 'context-menu-content',
    })
    expect(menu).toBeDefined()
  })

  it('renders items inside the menu when open', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} open={true} />
      )
    })

    const appleItem = component!.root.findByProps({
      'data-testid': 'combobox-item-1',
    })
    expect(appleItem).toBeDefined()
    expect(appleItem.children[0]).toBe('Apple')
  })

  it('calls onSelect with item id and closes menu when item clicked', () => {
    const onSelect = jest.fn()
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox
          {...defaultProps}
          onSelect={onSelect}
          onOpenChange={onOpenChange}
          open={true}
        />
      )
    })

    const bananaItem = component!.root.findByProps({
      'data-testid': 'combobox-item-2',
    })

    act(() => {
      bananaItem.props.onClick()
    })

    expect(onSelect).toHaveBeenCalledWith('2')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('disabled prevents opening', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox
          {...defaultProps}
          disabled={true}
          onOpenChange={onOpenChange}
        />
      )
    })

    const trigger = component!.root.findByProps({
      'data-testid': 'context-menu-trigger',
    })

    act(() => {
      trigger.props.onClick()
    })

    expect(onOpenChange).not.toHaveBeenCalled()
    const menu = component!.root.findAll(
      (n) => n.props['data-testid'] === 'context-menu-content'
    )
    expect(menu.length).toBe(0)
  })

  it('shows clear button when value and onClear are provided', () => {
    const onClear = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} value="Apple" onClear={onClear} />
      )
    })

    const clearButton = component!.root.findByProps({
      'aria-label': 'Clear',
    })
    expect(clearButton).toBeDefined()
  })

  it('does not show clear button when value is empty', () => {
    const onClear = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} value="" onClear={onClear} />
      )
    })

    const clearButtons = component!.root.findAll(
      (n) => n.props['aria-label'] === 'Clear'
    )
    expect(clearButtons.length).toBe(0)
  })

  it('calls onClear when clear button clicked', () => {
    const onClear = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} value="Apple" onClear={onClear} />
      )
    })

    const clearButton = component!.root.findByProps({
      'aria-label': 'Clear',
    })

    act(() => {
      clearButton.props.onClick({ stopPropagation: jest.fn() })
    })

    expect(onClear).toHaveBeenCalled()
  })

  it('shows emptyText when items array is empty', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox
          {...defaultProps}
          items={[]}
          open={true}
          emptyText="Nothing here"
        />
      )
    })

    const allDivs = component!.root.findAllByType('div')
    const emptyDiv = allDivs.find(
      (d) =>
        d.children.length === 1 && d.children[0] === 'Nothing here'
    )
    expect(emptyDiv).toBeDefined()
  })

  it('marks the item matching selectedId as selected', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} selectedId="2" open={true} />
      )
    })

    const bananaItem = component!.root.findByProps({
      'data-testid': 'combobox-item-2',
    })
    const appleItem = component!.root.findByProps({
      'data-testid': 'combobox-item-1',
    })

    expect(bananaItem.props['aria-selected']).toBe(true)
    expect(appleItem.props['aria-selected']).toBe(false)
  })

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox
          {...defaultProps}
          onSearchChange={onSearchChange}
          open={true}
        />
      )
    })

    const searchInput = component!.root.findByProps({
      'data-testid': 'search-input',
    })

    act(() => {
      searchInput.props.onChange({ target: { value: 'ban' } })
    })

    expect(onSearchChange).toHaveBeenCalledWith('ban')
  })

  it('calls onOpenChange when closing via controlled mode', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox
          {...defaultProps}
          open={true}
          onOpenChange={onOpenChange}
        />
      )
    })

    const trigger = component!.root.findByProps({
      'data-testid': 'context-menu-trigger',
    })

    act(() => {
      trigger.props.onClick()
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Combobox {...defaultProps} testID="combobox-test" />
      )
    })

    const root = component!.root.findByProps({
      'data-testid': 'combobox-test',
    })
    expect(root).toBeDefined()
  })
})
