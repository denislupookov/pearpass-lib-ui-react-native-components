import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from './Button';

jest.mock('./ButtonSpinner', () => ({
    ButtonSpinner: () => <span data-testid="mock-button-spinner" />,
}));

jest.mock('./Button.styles', () => ({
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

const DummyIcon = ({ width, height }: { width?: number; height?: number }) => {
    void width;
    void height;
    return null;
};

describe('Button', () => {
    it('renders label and triggers onClick when enabled', () => {
        const onClick = jest.fn();
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Button onClick={onClick}>
                    Label
                </Button>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();

        const button = component!.root.findByType('button');
        act(() => {
            button.props.onClick?.({});
        });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('disables interactions when disabled', () => {
        const onClick = jest.fn();
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Button onClick={onClick} disabled>
                    Label
                </Button>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();

        const button = component!.root.findByType('button');
        expect(button.props.disabled).toBe(true);
        expect(button.props['aria-disabled']).toBe(true);
        expect(button.props.onClick).toBeUndefined();
    });

    it('disables interactions and shows loading state when loading', () => {
        const onClick = jest.fn();
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Button onClick={onClick} isLoading>
                    Label
                </Button>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();

        const button = component!.root.findByType('button');
        expect(button.props.disabled).toBe(false);
        expect(button.props['aria-busy']).toBe(true);
        expect(button.props['aria-disabled']).toBe(true);
        expect(button.props.onClick).toBeUndefined();
    });

    it('supports icon-only buttons with aria-label', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Button aria-label="Account" iconBefore={<DummyIcon />} />
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();

        const button = component!.root.findByType('button');
        expect(button.props['aria-label']).toBe('Account');
    });
});
