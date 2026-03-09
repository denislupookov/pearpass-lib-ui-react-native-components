import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from './Text';

jest.mock('./Text.styles', () => ({
    styles: {
        textBase: {},
        variantLabel: {},
        variantBody: {},
        variantBodyEmphasized: {},
        variantCaption: {},
    },
}));

describe('Text', () => {
    it('renders span with default label variant', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Text>
                    The quick brown fox jumps over the lazy dog.
                </Text>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('span')).toBeDefined();
    });

    it('renders paragraph when as is p', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Text as="p">
                    The quick brown fox jumps over the lazy dog.
                </Text>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('p')).toBeDefined();
    });

    it('renders caption variant', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Text variant="caption">
                    The quick brown fox jumps over the lazy dog.
                </Text>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });
});
