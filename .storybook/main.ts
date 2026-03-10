import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from "path";
import { fileURLToPath } from "url";

function getAbsolutePath(value: string) {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-docs'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    async viteFinal(config) {
        const { mergeConfig } = await import('vite');

        const babel = await import('@babel/core');

        const { default: styleXPlugin } = await import('@stylexjs/babel-plugin');
        // @ts-ignore We don't have types for this preset
        const { default: rsdPreset } = await import('react-strict-dom/babel-preset');

        const { default: react } = await import('@vitejs/plugin-react');

        const styleXOptions = {
            dev: true,
            debug: false,
            importSources: [{ from: 'react-strict-dom', as: 'css' }],
            runtimeInjection: true,
            styleResolution: 'property-specificity' as const,
            unstable_moduleResolution: {
                rootDir: process.cwd(),
                themeFileExtension: '.css',
                type: 'commonJS' as const,
            },
        };

        const reactWithRSD = react({
            babel: {
                configFile: false,
                babelrc: false,
                presets: [
                    // react-strict-dom/babel-preset but with runtimeInjection:true for StyleX.
                    // We can't use the preset directly since it hardcodes runtimeInjection:false,
                    // so we manually compose the same plugins the preset would use.
                    ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                    // React-strict-dom JSX transform: html.div → <div/>, etc.
                    // This is what react-strict-dom/babel-preset's first plugin does.
                    rsdPreset(null, { debug: false, platform: 'web' }).plugins[0],
                    // StyleX with runtimeInjection:true
                    [styleXPlugin, styleXOptions],
                ],
            },
        });

        // For the react-strict-dom/runtime package (in node_modules):
        // It ships with an uncompiled stylex.create() — process it with runtimeInjection:true.
        const rsdRuntimePlugin = {
            name: 'react-strict-dom-runtime-transform',
            enforce: 'pre' as const,
            async transform(code: string, id: string) {
                if (!id.includes('react-strict-dom')) return null;
                if (!id.includes('runtime')) return null;

                if (!code.includes('stylex.create') && !code.includes('css.create')) {
                    return null;
                }

                try {
                    const result = await babel.transformAsync(code, {
                        filename: id,
                        plugins: [
                            [styleXPlugin, {
                                ...styleXOptions,
                                importSources: ['@stylexjs/stylex'],
                            }],
                        ],
                        configFile: false,
                        babelrc: false,
                        sourceMaps: true,
                    });
                    if (result?.code) {
                        return { code: result.code, map: result.map };
                    }
                } catch (e) {
                    console.error('[RSD] Failed to compile react-strict-dom/runtime:', e);
                }
                return null;
            },
        };

        return mergeConfig(config, {
            plugins: [
                rsdRuntimePlugin,
                ...(Array.isArray(reactWithRSD) ? reactWithRSD : [reactWithRSD]),
            ],
            // Exclude from esbuild pre-bundling so our plugin can process it
            optimizeDeps: {
                exclude: ['react-strict-dom'],
            },
            define: {
                'process.env': {},
            },
        });
    },
};

export default config;
