import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Link.styles';
import { LinkProps } from './types';
import { getPlatformHref, useLinkPress } from './linkPlatformHelper';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { children, style: userStyle, isExternal, target, rel, href, onClick, ...rest },
    ref
) {
    const style = [styles.linkBase, userStyle];
    const linkTarget = isExternal ? '_blank' : target;
    const linkRel = isExternal ? (rel ? `${rel} noopener noreferrer` : 'noopener noreferrer') : rel;

    const linkPress = useLinkPress(href);

    const handlePress = (e: React.MouseEvent<HTMLAnchorElement> | Event | unknown) => {
        if (linkPress) {
            linkPress(e);
        }
        if (onClick) {
            onClick(e as Parameters<typeof onClick>[0]);
        }
    };

    return (
        <html.a
            {...rest}
            href={getPlatformHref(href)}
            onClick={handlePress}
            target={linkTarget}
            rel={linkRel}
            ref={ref}
            style={style}
        >
            {children}
        </html.a>
    );
});

Link.displayName = 'Link';
