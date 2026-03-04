export interface ThemeColors {
    colorBackground: string;
    colorSurfacePrimary: string;
    colorSurfaceSecondary: string;

    colorPrimary: string;
    colorSecondary: string;

    colorTextPrimary: string;
    colorOnPrimary: string;
    colorTextSecondary: string;

    colorBorderPrimary: string;
    colorBorderSecondary: string;

    colorSurfaceError: string;
    colorSurfaceWarning: string;
}

export interface Theme {
    colors: ThemeColors;
}

export enum ThemeType {
    Dark = 'dark',
    Light = 'light',
}
