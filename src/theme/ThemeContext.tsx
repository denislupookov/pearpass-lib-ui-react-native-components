import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { html } from 'react-strict-dom';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { darkThemeStyle } from './themes/dark.css';
import { lightThemeStyle } from './themes/light.css';
import type { Theme } from './types';
import { ThemeType } from './types';

const getTheme = (type: ThemeType): Theme => {
    switch (type) {
        case ThemeType.Light:
            return lightTheme;
        case ThemeType.Dark:
        default:
            return darkTheme;
    }
}

const getThemeStyle = (type: ThemeType) => {
    switch (type) {
        case ThemeType.Light:
            return lightThemeStyle;
        case ThemeType.Dark:
        default:
            return darkThemeStyle;
    }
}

interface ThemeContextValue {
    theme: Theme;
    themeType: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: darkTheme,
    themeType: ThemeType.Dark,
    setTheme: () => { },
});


interface ThemeProviderProps {
    theme?: ThemeType;
    children: ReactNode;
}

export function ThemeProvider({ theme: initialTheme = ThemeType.Dark, children }: ThemeProviderProps) {
    const [themeType, setThemeType] = useState<ThemeType>(initialTheme);

    const value: ThemeContextValue = {
        theme: getTheme(themeType),
        themeType: themeType,
        setTheme: setThemeType,
    };

    return (
        <ThemeContext.Provider value={value}>
            <html.div
                data-theme={themeType}
                style={getThemeStyle(themeType)}
            >
                {children}
            </html.div>
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    return useContext(ThemeContext);
}
