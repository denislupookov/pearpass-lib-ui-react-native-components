import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Link } from './Link';
import { Text } from '../Text';

jest.mock('./Link.styles', () => ({
    styles: {
        linkBase: {},
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

describe('Link', () => {
    it('renders anchor with href', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Link href="#">
                    PearPass Application Terms of Use
                </Link>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('a').props.href).toBe('#');
        expect(component!.root.findByType('a').props.target).toBeUndefined();
    });

    it('renders with isExternal prop', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Link href="https://example.com" isExternal>
                    External Link
                </Link>
            );
        });

        const anchor = component!.root.findByType('a');
        expect(anchor.props.target).toBe('_blank');
        expect(anchor.props.rel).toBe('noopener noreferrer');
    });

    it('renders inside Text', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Text variant="body">
                    Continue with <Link href="#">existing PearPass</Link>
                </Text>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('a')).toBeDefined();
    });

    it('keeps explicit target when provided', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Link href="https://example.com" target="_self">
                    External Link
                </Link>
            );
        });

        const link = component!.root.findByType('a');
        expect(link.props.target).toBe('_self');
    });
});
