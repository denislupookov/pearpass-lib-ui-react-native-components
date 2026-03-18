import React from 'react'

import { render } from '@testing-library/react-native'
import { ThemeProvider } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Text, View } from 'react-native'

import { WarningAlert } from './index'

describe('WarningAlert Component', () => {
  test('renders with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('renders with title only', () => {
    const { getByText } = render(
      <ThemeProvider>
        <WarningAlert title="Warning Title" />
      </ThemeProvider>
    )
    expect(getByText('Warning Title')).toBeTruthy()
  })

  test('renders with message only', () => {
    const { getByText } = render(
      <ThemeProvider>
        <WarningAlert message="This is a warning message" />
      </ThemeProvider>
    )
    expect(getByText('This is a warning message')).toBeTruthy()
  })

  test('renders with both title and message', () => {
    const { getByText } = render(
      <ThemeProvider>
        <WarningAlert
          title="Important Notice"
          message="Please read this carefully"
        />
      </ThemeProvider>
    )
    expect(getByText('Important Notice')).toBeTruthy()
    expect(getByText('Please read this carefully')).toBeTruthy()
  })

  test('renders with warning variant', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert variant="warning" title="Warning" />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('renders with error variant', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert variant="error" title="Error" />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('renders children when provided', () => {
    const { getByText } = render(
      <ThemeProvider>
        <WarningAlert title="With Children">
          <Text>Child Button</Text>
          <Text>Another Child</Text>
        </WarningAlert>
      </ThemeProvider>
    )
    expect(getByText('Child Button')).toBeTruthy()
    expect(getByText('Another Child')).toBeTruthy()
  })

  test('renders complex children with nested components', () => {
    const { getByText } = render(
      <ThemeProvider>
        <WarningAlert title="Complex Children">
          <View>
            <Text>Button Text</Text>
          </View>
        </WarningAlert>
      </ThemeProvider>
    )
    expect(getByText('Button Text')).toBeTruthy()
  })

  test('does not render title when not provided', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <WarningAlert message="Only message" />
      </ThemeProvider>
    )
    expect(queryByText('Warning Title')).toBeNull()
  })

  test('does not render message when not provided', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <WarningAlert title="Only title" />
      </ThemeProvider>
    )
    expect(queryByText('Warning message')).toBeNull()
  })

  test('matches snapshot with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with warning variant and all props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert
          variant="warning"
          stretch={true}
          title="Warning Alert"
          message="This is a warning message"
        >
          <Text>Action Button</Text>
        </WarningAlert>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with error variant and all props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert
          variant="error"
          stretch={false}
          title="Error Alert"
          message="This is an error message"
        >
          <View>
            <Text>Fix Now</Text>
            <Text>Dismiss</Text>
          </View>
        </WarningAlert>
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with stretch enabled', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert title="Stretched" stretch={true} />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('matches snapshot with stretch disabled', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <WarningAlert title="Default Width" stretch={false} />
      </ThemeProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
