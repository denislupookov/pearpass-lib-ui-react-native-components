import React from 'react';

type SizableIconProps = {
    width?: number;
    height?: number;
    size?: number | string;
};

export const withIconSize = (icon: React.ReactNode, size: number) =>
    React.isValidElement<SizableIconProps>(icon)
        ? (
            icon.props.width !== undefined ||
            icon.props.height !== undefined ||
            icon.props.size !== undefined
        )
            ? icon
            : React.cloneElement(icon, { width: size, height: size })
        : icon;
