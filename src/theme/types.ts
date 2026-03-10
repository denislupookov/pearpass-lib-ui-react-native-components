export interface ThemeColors {
    colorBackground: string;
    colorSurfacePrimary: string;
    colorSurfaceSecondary: string;

    colorPrimary: string;
    colorSecondary: string;
    colorAccentHover: string;
    colorAccentActive: string;

    colorTextPrimary: string;
    colorOnPrimary: string;
    colorTextSecondary: string;
    colorTextDisabled: string;

    colorBorderPrimary: string;
    colorBorderSecondary: string;

    colorSurfaceHover: string;
    colorSurfaceElevatedOnInteraction: string;
    colorSurfaceDisabled: string;
    colorSurfaceDestructiveElevated: string;
    colorSurfaceDestructive: string;
    colorSurfaceError: string;
    colorSurfaceWarning: string;

    colorFocusRing: string;
}

export interface Theme {
    colors: ThemeColors;
}

export enum ThemeType {
    Dark = 'dark',
    Light = 'light',
}
