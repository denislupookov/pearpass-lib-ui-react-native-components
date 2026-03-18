import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'
import { ThemeProvider } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Text, View, Pressable, TouchableOpacity } from 'react-native'

import { ButtonUniversal } from './index'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import { KeyIcon } from '../../icons/KeyIcon'

const DummyLeftIcon = (props) => <KeyIcon {...props} testID="left-icon" />
const DummyRightIcon = (props) => (
  <ArrowDownIcon {...props} testID="right-icon" />
)

const getClickable = (utils) => {
  try {
    const p = utils.UNSAFE_getAllByType(Pressable)[0]
    if (p) return p
  } catch {}
  try {
    const t = utils.UNSAFE_getAllByType(TouchableOpacity)[0]
    if (t) return t
  } catch {}
  const walk = (inst) => {
    if (!inst) return null
    if (inst.props && typeof inst.props.onPress === 'function') return inst
    if (inst.children) {
      for (const child of inst.children) {
        const found = walk(child)
        if (found) return found
      }
    }
    return null
  }
  const found = walk(utils.root)
  if (found) return found
  throw new Error('Clickable element with onPress not found')
}

describe('ButtonUniversal Component', () => {
  test('renders empty button with default props', () => {
    const onPressMock = jest.fn()
    const utils = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} />
      </ThemeProvider>
    )
    const clickable = getClickable(utils)
    fireEvent.press(clickable)
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  test('renders with text children', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock}>
          <Text>Button Text</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(getByText('Button Text')).toBeTruthy()
  })

  test('renders with complex children', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock}>
          <View>
            <Text>Title</Text>
            <Text>Subtitle</Text>
          </View>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(getByText('Title')).toBeTruthy()
    expect(getByText('Subtitle')).toBeTruthy()
  })

  test('renders left icon only', () => {
    const onPressMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} leftIcon={DummyLeftIcon} />
      </ThemeProvider>
    )
    expect(getByTestId('left-icon')).toBeTruthy()
    expect(queryByTestId('right-icon')).toBeNull()
  })

  test('renders right icon only', () => {
    const onPressMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} rightIcon={DummyRightIcon} />
      </ThemeProvider>
    )
    expect(getByTestId('right-icon')).toBeTruthy()
    expect(queryByTestId('left-icon')).toBeNull()
  })

  test('renders both icons', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <ThemeProvider>
        <ButtonUniversal
          onPress={onPressMock}
          leftIcon={DummyLeftIcon}
          rightIcon={DummyRightIcon}
        />
      </ThemeProvider>
    )
    expect(getByTestId('left-icon')).toBeTruthy()
    expect(getByTestId('right-icon')).toBeTruthy()
  })

  test('renders left icon with text children', () => {
    const onPressMock = jest.fn()
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} leftIcon={DummyLeftIcon}>
          <Text>With Icon</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(getByTestId('left-icon')).toBeTruthy()
    expect(getByText('With Icon')).toBeTruthy()
  })

  test('does not trigger onPress when disabled', () => {
    const onPressMock = jest.fn()
    const utils = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} disabled={true}>
          <Text>Disabled</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    const pressable = utils.UNSAFE_getAllByType(Pressable)[0]
    expect(pressable.props.disabled).toBe(true)
    expect(typeof pressable.props.onPress).not.toBe('function')
    expect(onPressMock).not.toHaveBeenCalled()
  })

  test('handles press state correctly', () => {
    const onPressMock = jest.fn()
    const utils = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock}>
          <Text>Pressable</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    const clickable = getClickable(utils)
    fireEvent.press(clickable)
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  test('matches snapshot with default props', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock}>
          <Text>Default Button</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with primary variant', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} variant="primary">
          <Text>Primary</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with secondary variant', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} variant="secondary">
          <Text>Secondary</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with stretch enabled', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal onPress={onPressMock} stretch={true}>
          <Text>Stretched</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with all props configured', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal
          onPress={onPressMock}
          leftIcon={DummyLeftIcon}
          rightIcon={DummyRightIcon}
          variant="secondary"
          stretch={true}
          layout="grouped"
          customBorderRadius={15}
          customPadding={12}
          disabled={false}
        >
          <Text>Full Configuration</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with disabled state', () => {
    const onPressMock = jest.fn()
    const { toJSON } = render(
      <ThemeProvider>
        <ButtonUniversal
          onPress={onPressMock}
          disabled={true}
          leftIcon={DummyLeftIcon}
        >
          <Text>Disabled Button</Text>
        </ButtonUniversal>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
