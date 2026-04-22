// scripts/generate-tokens.mjs

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const tokens = JSON.parse(readFileSync(join(root, 'src', 'theme', 'tokens.json'), 'utf8'));
const { colors, spacing, radius, typography } = tokens;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toCssValue(v) {
    return typeof v === 'number' ? `${v}px` : v;
}

function rawBlock(name, obj) {
    const entries = Object.entries(obj)
        .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`)
        .join('\n');
    return `export const ${name} = {\n${entries}\n} as const;`;
}

const header = `// AUTO-GENERATED — do not edit directly.\n// Source: src/theme/tokens.json  |  Generator: scripts/generate-tokens.mjs\n// Run \`npm run generate-tokens\` to update.\n`;

// All tokens merged for the single defineVars call
const allDarkEntries = [
    ...Object.entries(colors.dark),
    ...Object.entries(spacing),
    ...Object.entries(radius),
    ...Object.entries(typography),
];

const allLightEntries = [
    ...Object.entries(colors.light),
    ...Object.entries(spacing),
    ...Object.entries(radius),
    ...Object.entries(typography),
];

// ─── 1. tokens.css.ts — single defineVars with ALL tokens ────────────────────
const tokensCssTs = `${header}
import { css } from 'react-strict-dom';

export const tokens = css.defineVars({
${allDarkEntries.map(([k, v]) => `    ${k}: '${toCssValue(v)}',`).join('\n')}
});

export type Tokens = typeof tokens;
`;

// ─── 2. tokens.raw.ts — Static plain values (for React Native StyleSheet) ────
const staticEntries = [
    ...Object.entries(spacing),
    ...Object.entries(radius),
    ...Object.entries(typography),
];

const tokensRawTs = `${header}
export const rawTokens = {
${staticEntries.map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join('\n')}
} as const;

export type RawTokens = typeof rawTokens;
`;

// ─── 3. dark.ts — dark Theme object for ThemeContext / useTheme() ─────────────
const darkTs = `${header}
import type { Theme } from '../types';

export const darkTheme: Theme = {
    colors: {
${Object.entries(colors.dark).map(([k, v]) => `        ${k}: '${v}',`).join('\n')}
    },
};
`;

// ─── 4. light.ts — light Theme object for ThemeContext / useTheme() ──────────
const lightTs = `${header}
import type { Theme } from '../types';

export const lightTheme: Theme = {
    colors: {
${Object.entries(colors.light).map(([k, v]) => `        ${k}: '${v}',`).join('\n')}
    },
};
`;

// ─── 5. dark.css.ts — StyleX createTheme for dark mode ───────────────────────
const darkCssTs = `${header}
import { css } from 'react-strict-dom';
import { tokens } from '../tokens.css';

export const darkThemeStyle = css.createTheme(tokens, {
${allDarkEntries.map(([k, v]) => `    ${k}: '${toCssValue(v)}',`).join('\n')}
});
`;

// ─── 6. light.css.ts — StyleX createTheme for light mode ─────────────────────
const lightCssTs = `${header}
import { css } from 'react-strict-dom';
import { tokens } from '../tokens.css';

export const lightThemeStyle = css.createTheme(tokens, {
${allLightEntries.map(([k, v]) => `    ${k}: '${toCssValue(v)}',`).join('\n')}
});
`;

// ─── 7. tailwind-theme.css — CSS custom properties for Tailwind v4 (web) ─────
const kebab = (key) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const cssVar = ([k, v]) => `  --${kebab(k)}: ${toCssValue(v)};`;
const themeRef = ([k]) => `  --${kebab(k)}: var(--${kebab(k)});`;

const staticEntriesForCss = [
    ...Object.entries(spacing),
    ...Object.entries(radius),
    ...Object.entries(typography),
];

// Light values come in partially filled — only emit vars that actually have a value
const lightColorEntries = Object.entries(colors.light).filter(([, v]) => v !== '' && v != null);

const tailwindThemeCss = `/* AUTO-GENERATED — do not edit directly. */
/* Source: src/theme/tokens.json  |  Generator: scripts/generate-tokens.mjs */
/* Run \`npm run generate-tokens\` to update. */

:root,
[data-theme='dark'] {
${Object.entries(colors.dark).map(cssVar).join('\n')}
${staticEntriesForCss.map(cssVar).join('\n')}
}
${lightColorEntries.length > 0 ? `
[data-theme='light'] {
${lightColorEntries.map(cssVar).join('\n')}
}
` : ''}
/* Expose vars to Tailwind v4 so utilities (bg-*, text-*, border-*, ...) respond to data-theme switches */
@theme inline {
${Object.entries(colors.dark).map(themeRef).join('\n')}
}
`;

// ─── WRITE ────────────────────────────────────────────────────────────────────

const files = [
    ['src/theme/tokens.css.ts', tokensCssTs],
    ['src/theme/tokens.raw.ts', tokensRawTs],
    ['src/theme/themes/dark.ts', darkTs],
    ['src/theme/themes/light.ts', lightTs],
    ['src/theme/themes/dark.css.ts', darkCssTs],
    ['src/theme/themes/light.css.ts', lightCssTs],
    ['src/theme/tailwind-theme.css', tailwindThemeCss],
];

for (const [relPath, content] of files) {
    writeFileSync(join(root, relPath), content, 'utf8');
    console.log(`✅ Generated: ${relPath}`);
}

console.log('\nDone!');
