import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SearchField } from './SearchField';

jest.mock('./SearchField.styles', () => ({
  styles: {
    root: {},
    rootSmall: {},
    rootMedium: {},
    rootFocused: {},
    icon: {},
    input: {},
  },
}));

jest.mock('../../icons', () => ({
  SearchOutlined: () => <span data-testid="search-icon" />,
}));

describe('SearchField', () => {
  it('renders with placeholder and default aria label', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <SearchField
          value=""
          placeholderText="Search in Settings"
          onChangeText={() => {}}
          testID="search-field"
        />
      );
    });

    const input = component!.root.findByType('input');

    expect(component!.root.findByProps({ 'data-testid': 'search-field' })).toBeTruthy();
    expect(component!.root.findByProps({ 'data-testid': 'search-icon' })).toBeTruthy();
    expect(input.props.placeholder).toBe('Search in Settings');
    expect(input.props['aria-label']).toBe('Search in Settings');
  });

  it('calls onChangeText with the input value', () => {
    const onChangeText = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <SearchField
          value=""
          onChangeText={onChangeText}
        />
      );
    });

    const input = component!.root.findByType('input');

    act(() => {
      input.props.onInput({ target: { value: 'settings' } });
    });

    expect(onChangeText).toHaveBeenCalledWith('settings');
  });

  it('forwards focus and blur callbacks', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <SearchField
          value=""
          onChangeText={() => {}}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );
    });

    const input = component!.root.findByType('input');

    act(() => {
      input.props.onFocus();
      input.props.onBlur();
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
