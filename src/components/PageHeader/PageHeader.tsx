import React from 'react';
import { html } from 'react-strict-dom';
import { Title } from '../Title';
import { Text } from '../Text';
import { TitleElement } from '../Title/types';

export interface PageHeaderProps {
    title: string;
    subtitle?: React.ReactNode;
    as?: TitleElement;
    testID?: string;
    style?: React.ComponentProps<typeof html.div>['style'];
    'aria-label'?: string;
}

import { styles } from './PageHeader.styles';

export const PageHeader = ({ title, subtitle, as = 'h2', testID, style, 'aria-label': ariaLabel }: PageHeaderProps) => {
    return (
        <html.div style={[styles.root, style]} data-testid={testID} aria-label={ariaLabel}>
            <Title as={as}>{title}</Title>
            {subtitle && (
                <Text as="p" variant="label" style={styles.subtitle}>
                    {subtitle}
                </Text>
            )}
        </html.div>
    );
};

PageHeader.displayName = 'PageHeader';
