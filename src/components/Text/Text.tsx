import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Text.styles';
import { variantStyleMap } from './Text.config';
import { TextElement, TextVariant } from './types';

type HtmlTextProps = React.ComponentProps<typeof html.span>;

export interface TextProps extends Omit<HtmlTextProps, 'children'> {
    children: React.ReactNode;
    as?: TextElement;
    variant?: TextVariant;
    color?: string;
    numberOfLines?: number;
    noWrap?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
    { children, as = 'span', variant = 'label', color, numberOfLines, noWrap, style: userStyle, ...rest },
    ref
) {
    const numberOfLinesStyle = numberOfLines ? { lineClamp: numberOfLines, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: numberOfLines, WebkitBoxOrient: 'vertical' } : undefined
    const noWrapStyle = noWrap ? { whiteSpace: 'nowrap', flexShrink: 0 } : undefined
    const style = [styles.textBase, variantStyleMap[variant], color ? { color } : undefined, numberOfLinesStyle, noWrapStyle, userStyle];

    switch (as) {
        case 'p':
            return (
                <html.p {...rest} ref={ref as React.Ref<HTMLParagraphElement>} style={style}>
                    {children}
                </html.p>
            );
        case 'span':
        default:
            return (
                <html.span {...rest} ref={ref as React.Ref<HTMLSpanElement>} style={style}>
                    {children}
                </html.span>
            );
    }
});

Text.displayName = 'Text';
