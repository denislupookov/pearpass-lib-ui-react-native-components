import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Title.styles';
import { TitleElement } from './types';

type HtmlTitleProps = React.ComponentProps<typeof html.h1>;

export interface TitleProps extends Omit<HtmlTitleProps, 'children'> {
    children: React.ReactNode;
    as?: TitleElement;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(function Title(
    { children, as = 'h1', style: userStyle, ...rest },
    ref
) {
    const style = [styles.titleBase, userStyle];

    switch (as) {
        case 'h2':
            return (
                <html.h2 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h2>
            );
        case 'h3':
            return (
                <html.h3 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h3>
            );
        case 'h4':
            return (
                <html.h4 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h4>
            );
        case 'h5':
            return (
                <html.h5 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h5>
            );
        case 'h6':
            return (
                <html.h6 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h6>
            );
        case 'h1':
        default:
            return (
                <html.h1 {...rest} ref={ref as React.Ref<HTMLHeadingElement>} style={style}>
                    {children}
                </html.h1>
            );
    }
});

Title.displayName = 'Title';
