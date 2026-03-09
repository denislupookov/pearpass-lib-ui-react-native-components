import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Link.styles';
import { LinkProps } from './types';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { children, style: userStyle, isExternal, target, rel, ...rest },
    ref
) {
    const style = [styles.linkBase, userStyle];
    const linkTarget = isExternal ? '_blank' : target;
    const linkRel = isExternal ? (rel ? `${rel} noopener noreferrer` : 'noopener noreferrer') : rel;

    return (
        <html.a {...rest} target={linkTarget} rel={linkRel} ref={ref} style={style}>
            {children}
        </html.a>
    );
});

Link.displayName = 'Link';
