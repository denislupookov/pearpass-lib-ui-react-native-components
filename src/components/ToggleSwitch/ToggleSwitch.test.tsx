import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ToggleSwitch } from './ToggleSwitch'

jest.mock('./ToggleSwitch.styles', () => ({
  styles: {
    root: {},
    details: {},
    label: {},
    description: {},
    rail: {},
    railUnchecked: {},
    railChecked: {},
    railDisabled: {},
    knob: {},
    knobUnchecked: {},
    knobChecked: {}
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

describe('ToggleSwitch', () => {
  it('renders without label or description', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ToggleSwitch aria-label="Toggle" />)
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders with label and description', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ToggleSwitch
          label="Notifications"
          description="Receive push notifications"
        />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders checked state', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ToggleSwitch checked={true} label="Toggle" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders unchecked state', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ToggleSwitch checked={false} label="Toggle" />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('calls onChange with toggled value when clicked', () => {
    const onChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ToggleSwitch checked={false} onChange={onChange} label="Toggle" />
      )
    })

    const button = component!.root.findByProps({ role: 'switch' })

    act(() => {
      button.props.onClick()
    })

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ToggleSwitch
          checked={false}
          onChange={onChange}
          disabled
          label="Toggle"
        />
      )
    })

    const button = component!.root.findByProps({ role: 'switch' })

    act(() => {
      button.props.onClick?.()
    })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders label only without description', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<ToggleSwitch label="Label only" />)
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })
})
