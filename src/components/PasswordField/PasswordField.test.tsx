import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { PasswordField } from './PasswordField';


jest.mock('../InputField/AnimatedContainer', () => ({
  AnimatedContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  NATIVE_ANIMATED: false,
}));

jest.mock('./PasswordField.styles', () => ({
  styles: {
    rightSlotContainer: {},
    divider: {},
    eyeButton: {},
    inputWrapper: {},
    infoBox: {},
    infoBoxIcon: {},
    infoBoxText: {},
  },
}));

jest.mock('../Button/Button.styles', () => ({
  styles: {
    buttonBase: {},
    fullWidth: {},
    sizeSmall: {},
    sizeMedium: {},
    iconOnlySmall: {},
    iconOnlyMedium: {},
    label: {},
    icon: {},
    iconSize: () => ({}),
    disabled: {},
    loading: {},
    loadingContent: {},
    spinnerContainer: {},
    spinner: {},
    variantPrimary: {},
    variantPrimaryDisabled: {},
    variantSecondary: {},
    variantSecondaryDisabled: {},
    variantTertiary: {},
    variantTertiaryDisabled: {},
    variantDestructive: {},
    variantDestructiveDisabled: {},
  },
}));

jest.mock('../Button/Button.config', () => ({
  variantStyleMap: { primary: {}, secondary: {}, tertiary: {}, destructive: {} },
  sizeStyleMap: { small: {}, medium: {} },
  iconOnlyStyleMap: { small: {}, medium: {} },
  iconSizeMap: { small: 16, medium: 18 },
  variantDisabledStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {},
  },
  variantTextStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {},
  },
  variantDisabledTextStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {},
  },
}));

jest.mock('../PasswordIndicator/PasswordIndicator.styles', () => ({
  styles: {
    container: {},
    iconContainer: {},
    label: {},
    variantVulnerable: {},
    variantDecent: {},
    variantStrong: {},
    variantMatch: {},
  },
  variantStyleMap: { vulnerable: {}, decent: {}, strong: {}, match: {} },
  variantLabelMap: {
    vulnerable: 'Vulnerable',
    decent: 'Decent',
    strong: 'Strong',
    match: 'Match',
  },
}));

jest.mock('../InputField/InputField.styles', () => ({
  styles: {
    wrapper: {},
    container: {},
    containerFocused: {},
    containerError: {},
    containerNativeAnimated: {},
    containerGrouped: {},
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
  FieldError: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-field-error">{children}</span>
  ),
}));
jest.mock('../../icons', () => ({
  EyeFilled: () => <div data-testid="eye-filled" />,
  EyeOutlined: () => <div data-testid="eye-outlined" />,
  InfoOutlined: (props: Record<string, unknown>) => <div data-testid="info-outlined" {...props} />,
}));

jest.mock('./InfoBoxAnimatedContainer', () => ({
  InfoBoxAnimatedContainer: ({ visible, children }: { visible: boolean; children: React.ReactNode }) => (
    <div data-testid="info-box-animated-container" data-visible={visible}>
      {children}
    </div>
  ),
}));

describe('PasswordField', () => {
  it('renders an input element and hides password by default', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value=""
          placeholderText="Enter your password"
          onChangeText={() => { }}
          testID="password-field"
        />
      );
    });

    // Input should be present
    const input = component!.root.findByType('input');
    expect(input).toBeTruthy();

    // Password should be obscured by default — type="password"
    expect(input.props.type).toBe('password');

    // Eye icon shown in its default (outlined = hidden) state
    expect(() =>
      component!.root.findByProps({ 'data-testid': 'eye-outlined' })
    ).not.toThrow();
  });

  it('renders error message and password indicator when provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Confirm Password"
          value="pass123"
          placeholderText="Repeat password"
          onChangeText={() => { }}
          variant="error"
          errorMessage="Passwords do not match."
          passwordIndicator="vulnerable"
          testID="repeat-password-field"
        />
      );
    });

    // Error message should be rendered
    const errorNode = component!.root.findByProps({
      'data-testid': 'mock-field-error',
    });
    expect(errorNode).toBeTruthy();
    expect(errorNode.props.children).toBe('Passwords do not match.');

    // Password indicator for 'vulnerable' should be visible
    // (rendered by PasswordIndicator — its label text comes from variantLabelMap)
    const tree = component!.toJSON();
    expect(JSON.stringify(tree)).toContain('Vulnerable');
  });

  it('triggers onChangeText callback when input value changes', () => {
    const onChangeTextMock = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value=""
          placeholderText="Enter your password"
          onChangeText={onChangeTextMock}
          testID="password-field"
        />
      );
    });

    act(() => {
      component!.root
        .findByType('input')
        .props.onInput({ target: { value: 'secret123' } });
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('secret123');
    expect(onChangeTextMock).toHaveBeenCalledTimes(1);
  });
  it('toggles input type between password and text when eye button is clicked', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value="secret"
          placeholderText="Enter your password"
          onChangeText={() => { }}
          testID="password-field"
        />
      );
    });

    const input = () => component!.root.findByType('input');

    // Initially obscured
    expect(input().props.type).toBe('password');

    // Click the eye toggle button
    act(() => {
      component!.root
        .findByProps({ 'data-testid': 'password-field-eye-button' })
        .props.onClick();
    });

    // Now visible
    expect(input().props.type).toBe('text');

    // Click again to re-hide
    act(() => {
      component!.root
        .findByProps({ 'data-testid': 'password-field-eye-button' })
        .props.onClick();
    });

    expect(input().props.type).toBe('password');
  });

  it('does not render info box when infoBox prop is not provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value=""
          onChangeText={() => { }}
        />
      );
    });

    expect(() =>
      component!.root.findByProps({ 'data-testid': 'password-field-info-box' })
    ).toThrow();
  });

  it('shows info box on focus and hides on blur when infoBox prop is provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value=""
          onChangeText={() => { }}
          infoBox="Use a strong password"
        />
      );
    });

    const animatedContainer = () =>
      component!.root.findByProps({ 'data-testid': 'info-box-animated-container' });

    // Initially hidden
    expect(animatedContainer().props['data-visible']).toBe(false);

    // Focus input
    act(() => {
      component!.root.findByType('input').props.onFocus();
    });

    expect(animatedContainer().props['data-visible']).toBe(true);

    // Blur input
    act(() => {
      component!.root.findByType('input').props.onBlur();
    });

    expect(animatedContainer().props['data-visible']).toBe(false);
  });

  it('renders the info box text content', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <PasswordField
          label="Password"
          value=""
          onChangeText={() => { }}
          infoBox="Use a strong password"
        />
      );
    });

    const infoBox = component!.root.findByProps({ 'data-testid': 'password-field-info-box' });
    expect(infoBox).toBeTruthy();
    const tree = component!.toJSON();
    expect(JSON.stringify(tree)).toContain('Use a strong password');
  });
});
