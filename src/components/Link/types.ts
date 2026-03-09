import React from 'react';
import { html } from 'react-strict-dom';

type HtmlLinkProps = React.ComponentProps<typeof html.a>;

export interface LinkProps extends Omit<HtmlLinkProps, 'children'> {
    children: React.ReactNode;
    isExternal?: boolean;
}
