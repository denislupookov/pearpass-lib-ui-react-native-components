import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { InputField } from './InputField';
import { FieldErrorProps } from '../FieldError/FieldError';

jest.mock('./AnimatedContainer', () => ({
  AnimatedContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  NATIVE_ANIMATED: false,
}));

jest.mock('./InputField.styles', () => ({
  styles: {
    wrapper: {},
    container: {},
    containerFocused: {},
    containerError: {},
    containerNativeAnimated: {},
    innerColumn: {},
    label: {},
    input: {},
    rightSlotContainer: {},
    errorMessage: {},
  },
  variantContainerStyleMap: {
    default: {},
    error: {},
  },
}));

jest.mock('../Text/Text.styles', () => ({
  styles: {
    textBase: {},
    variantLabel: {},
    variantBody: {},
    variantBodyEmphasized: {},
    variantCaption: {},
  },
}));

jest.mock('../Text/Text.config', () => ({
  variantStyleMap: { label: {}, body: {}, bodyEmphasized: {}, caption: {} },
}));

jest.mock('../FieldError/FieldError', () => ({
  FieldError: (props: FieldErrorProps) => <div data-testid="mock-field-error" {...props} />
}));


describe('InputField', () => {
  it('renders correctly with default props', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value=""
          placeholderText="Enter your email"
          onChangeText={() => { }}
          testID="email-input"
        />
      );
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error variant, right slot and error message', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Username"
          value="invalid_user"
          placeholderText="Enter username"
          onChangeText={() => { }}
          variant="error"
          errorMessage="Username is invalid."
          rightSlot={<span>!</span>}
          testID="username-input"
        />
      );
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('triggers onChangeText callback when input value changes', () => {
    const onChangeTextMock = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Test Input"
          value=""
          placeholderText="Type something"
          onChangeText={onChangeTextMock}
          testID="test-input"
        />
      );
    });

    const inputElement = component!.root.findByType('input');

    act(() => {
      inputElement.props.onInput({ target: { value: 'New text' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
    expect(onChangeTextMock).toHaveBeenCalledTimes(1);
  });
});
