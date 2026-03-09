import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Title } from './Title';

jest.mock('./Title.styles', () => ({
    styles: {
        titleBase: {},
    },
}));

describe('Title', () => {
    it('renders h1 by default', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title>
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h1')).toBeDefined();
    });

    it('renders h2 when as is h2', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title as="h2">
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h2')).toBeDefined();
    });

    it('renders h3 when as is h3', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title as="h3">
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h3')).toBeDefined();
    });

    it('renders h4 when as is h4', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title as="h4">
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h4')).toBeDefined();
    });

    it('renders h5 when as is h5', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title as="h5">
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h5')).toBeDefined();
    });

    it('renders h6 when as is h6', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <Title as="h6">
                    Display & Titles
                </Title>
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
        expect(component!.root.findByType('h6')).toBeDefined();
    });
});
