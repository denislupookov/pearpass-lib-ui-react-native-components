import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { FieldError } from './FieldError';

jest.mock('./FieldError.styles', () => ({
    styles: {
        root: {},
        text: {},
    },
}));

jest.mock('../../icons', () => ({
    ErrorFilled: () => null,
}));

describe('FieldError', () => {
    it('renders the error message', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <FieldError>This field is required.</FieldError>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();

        const span = component!.root.findAll(
            (node: renderer.ReactTestInstance) => node.type === 'span' && node.children?.includes('This field is required.')
        );
        expect(span.length).toBeGreaterThan(0);
    });

    it('forwards the id prop to the span for aria-describedby linking', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <FieldError id="field-error">Invalid value.</FieldError>
            );
        });

        const span = component!.root.find(
            (node: renderer.ReactTestInstance) => node.type === 'span' && node.props.id === 'field-error'
        );
        expect(span).toBeTruthy();
    });
});
