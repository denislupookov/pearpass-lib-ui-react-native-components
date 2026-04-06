import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { AlertMessage } from './AlertMessage'

jest.mock('./AlertMessage.styles', () => ({
  styles: {
    container: {},
    messageContainer: {},
    messageContainerBig: {},
    iconContainer: {},
    copy: {},
    title: {},
    description: {},
    link: {}
  },
  variantStyleMap: {
    success: {},
    error: {}
  },
  sizeStyleMap: {
    small: {},
    medium: {},
    big: {}
  }
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

jest.mock('../Link/Link.styles', () => ({
  styles: {
    linkBase: {}
  }
}))

describe('AlertMessage', () => {
  it('renders title, description, action text and icon when all props are provided', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <AlertMessage
          variant="success"
          size="medium"
          title="Test Alert"
          description="This is a test description."
          actionText="Test Action"
          onAction={() => {}}
          icon={<span data-testid="custom-icon">Icon</span>}
          testID="alert-message"
          actionTestId="alert-action"
        />
      )
    })

    // Container rendered
    expect(
      component!.root.findByProps({ 'data-testid': 'alert-message' })
    ).toBeTruthy()

    // Title text present
    const tree = JSON.stringify(component!.toJSON())
    expect(tree).toContain('Test Alert')

    // Description text present
    expect(tree).toContain('This is a test description.')

    // Action element present
    expect(
      component!.root.findByProps({ 'data-testid': 'alert-action' })
    ).toBeTruthy()

    // Custom icon rendered
    expect(
      component!.root.findByProps({ 'data-testid': 'custom-icon' })
    ).toBeTruthy()
  })

  it('triggers onAction callback when action text is clicked', () => {
    const onAction = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <AlertMessage
          variant="error"
          size="small"
          title="Error Title"
          description="Error occurred."
          actionText="Retry"
          onAction={onAction}
          actionTestId="alert-action"
        />
      )
    })

    act(() => {
      component!.root
        .findByProps({ 'data-testid': 'alert-action' })
        .props.onClick?.()
    })

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders without icon, actionText or testID without crashing', () => {
    let component: renderer.ReactTestRenderer

    expect(() => {
      act(() => {
        component = renderer.create(
          <AlertMessage
            variant="success"
            size="big"
            title="Minimal Alert"
            description="No extras here."
          />
        )
      })
    }).not.toThrow()

    const tree = JSON.stringify(component!.toJSON())
    expect(tree).toContain('Minimal Alert')
    expect(tree).toContain('No extras here.')
  })

  it('does not render action element when actionText is omitted', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <AlertMessage
          variant="error"
          size="medium"
          title="No Action"
          description="Read only alert."
          actionTestId="alert-action"
        />
      )
    })

    expect(() =>
      component!.root.findByProps({ 'data-testid': 'alert-action' })
    ).toThrow()
  })
})
