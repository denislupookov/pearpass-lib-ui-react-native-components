import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { PageHeader } from './PageHeader';

jest.mock('../Text/Text.styles', () => ({
    styles: {
        textBase: {},
        variantLabel: {},
        variantBody: {},
        variantBodyEmphasized: {},
        variantCaption: {},
    },
}));

jest.mock('../Title/Title.styles', () => ({
    styles: {
        titleBase: {},
    },
}));

jest.mock('./PageHeader.styles', () => ({
    styles: {
        root: {},
        subtitle: {},
    },
}));

describe('PageHeader', () => {
    it('renders title correctly', () => {
        let component: renderer.ReactTestRenderer;
        act(() => {
            component = renderer.create(<PageHeader title="Test Title" />);
        });
        const titleNodes = component!.root.findAll(
            (node) => typeof node.type === 'string' && node.children?.includes('Test Title')
        );
        expect(titleNodes.length).toBeGreaterThan(0);
    });

    it('renders subtitle when provided', () => {
        let component: renderer.ReactTestRenderer;
        act(() => {
            component = renderer.create(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
        });
        const subtitleNodes = component!.root.findAll(
            (node) => typeof node.type === 'string' && node.children?.includes('Test Subtitle')
        );
        expect(subtitleNodes.length).toBeGreaterThan(0);
    });

    it('applies aria-label to the container', () => {
        let component: renderer.ReactTestRenderer;
        act(() => {
            component = renderer.create(
                <PageHeader
                    title="Test Title"
                    aria-label="custom-aria-label"
                    testID="page-header"
                />
            );
        });
        const container = component!.root.find(
            (node) => node.props['data-testid'] === 'page-header'
        );
        expect(container.props['aria-label']).toBe('custom-aria-label');
    });

    it('renders correct heading level based on "as" prop', () => {
        let component: renderer.ReactTestRenderer;
        act(() => {
            component = renderer.create(<PageHeader title="H3 Title" as="h3" />);
        });
        const h3Nodes = component!.root.findAll(
            (node) => node.type === 'h3' && node.children?.includes('H3 Title')
        );
        expect(h3Nodes.length).toBeGreaterThan(0);
    });
});
