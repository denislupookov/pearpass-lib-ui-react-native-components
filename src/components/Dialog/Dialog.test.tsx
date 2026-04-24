import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Dialog } from './Dialog';

jest.mock('./Dialog.styles', () => ({
    styles: {
        modalLayer: {},
        backdrop: {},
        dialogPositioner: {},
    },
}));

jest.mock('../Panel/Panel.styles', () => ({
    styles: {
        root: {},
        header: {},
        title: {},
        closeButton: {},
        closeIcon: {},
        body: {},
        footer: {},
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

jest.mock('../Button', () => ({
    Button: ({
        children,
        onClick,
        'aria-label': ariaLabel,
        'data-testid': testID,
    }: {
        children?: React.ReactNode;
        onClick?: React.ComponentProps<'button'>['onClick'];
        'aria-label'?: string;
        'data-testid'?: string;
    }) => (
        <button onClick={onClick} aria-label={ariaLabel} data-testid={testID}>
            {children}
        </button>
    ),
}));

describe('Dialog', () => {
    it('renders with body and footer', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog
                    title="Title"
                    footer={<button>Save</button>}
                >
                    Body text
                </Dialog>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });

    it('invokes onClose when close button is clicked', () => {
        const onClose = jest.fn();
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog title="Title" onClose={onClose}>
                    Body
                </Dialog>
            );
        });

        const closeButton = component!.root.findByType('button');
        act(() => {
            closeButton.props.onClick?.();
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('hides close button when hideCloseButton is true', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog title="Title" hideCloseButton>
                    Body
                </Dialog>
            );
        });

        expect(component!.root.findAllByType('button')).toHaveLength(0);
    });

    it('passes testID to root element', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog title="Title" testID="dialog-1">
                    Body
                </Dialog>
            );
        });

        const root = component!.root.findAllByType('div').find(d => d.props['data-testid'] === 'dialog-1');
        expect(root).toBeDefined();
        expect(root?.props['data-testid']).toBe('dialog-1');
    });

    it('does not render when open is false', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog title="Title" open={false}>
                    Body
                </Dialog>
            );
        });

        expect(component!.toJSON()).toBeNull();
    });

    it('invokes onClose when backdrop is clicked', () => {
        const onClose = jest.fn();
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Dialog title="Title" onClose={onClose}>
                    Body
                </Dialog>
            );
        });

        const divs = component!.root.findAllByType('div');
        const backdrop = divs[1];

        act(() => {
            backdrop.props.onClick?.({ type: 'click' });
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
