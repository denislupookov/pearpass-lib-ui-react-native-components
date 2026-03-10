import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { TextArea } from './TextArea'

jest.mock('./TextArea.styles', () => ({
  styles: {
    root: {},
    label: {},
    labelDisabled: {},
    inputWrapper: {},
    inputWrapperFocused: {},
    inputWrapperError: {},
    inputWrapperDisabled: {},
    textarea: {},
    textareaDisabled: {}
  }
}))

jest.mock('../FieldError', () => ({
  FieldError: ({
    children,
    id
  }: {
    children: React.ReactNode
    id?: string
  }) => <span id={id}>{children}</span>
}))

describe('TextArea', () => {
  it('renders with label and placeholder', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <TextArea label="Description" placeholder="Write something…" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('calls onChange with string value', () => {
    const onChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<TextArea onChange={onChange} />)
    })

    const textarea = component!.root.findByType('textarea')
    act(() => {
      textarea.props.onChange({ target: { value: 'hello' } })
    })

    expect(onChange).toHaveBeenCalledWith('hello')
  })

  it('passes disabled to the textarea element', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<TextArea disabled />)
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const textarea = component!.root.findByType('textarea')
    expect(textarea.props.disabled).toBe(true)
  })

  it('renders error message when error prop is set', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<TextArea error="This field is required." />)
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const errorText = component!.root.findAll(
      (node: renderer.ReactTestInstance) =>
        node.type === 'span' &&
        node.children?.includes('This field is required.')
    )
    expect(errorText.length).toBeGreaterThan(0)
  })

  it('does not render error row when error is not set', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<TextArea label="Label" />)
    })

    const errorSpans = component!.root.findAll((node: renderer.ReactTestInstance) => node.type === 'span')
    expect(errorSpans.length).toBe(0)
  })
})
