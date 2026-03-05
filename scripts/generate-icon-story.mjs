import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src/icons/components');
const outputFile = path.join(process.cwd(), 'src/icons/Gallery.mdx');

// Find all the generated web components
const allFiles = fs.readdirSync(componentsDir);

// Add auto-generated comment to all generated files
const comment = '// This file is auto-generated. Do not edit it.\n';
for (const file of allFiles) {
  const filePath = path.join(componentsDir, file);
  if (fs.statSync(filePath).isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('This file is auto-generated')) {
      fs.writeFileSync(filePath, comment + content);
    }
  }
}

const files = allFiles
  .filter(file => file.endsWith('.tsx') && !file.endsWith('.native.tsx') && file !== 'index.ts');

const iconNames = files.map(file => file.replace('.tsx', ''));

const mdxContent = `
import { Meta, Title } from '@storybook/addon-docs/blocks';
import * as Icons from './components';
import { IconExplorer } from './IconExplorer';

<Meta title="Icons" name="Gallery" />

<Title>Icon Gallery</Title>

<IconExplorer icons={Icons} />
`;

fs.writeFileSync(outputFile, mdxContent.trim());
console.log('✅ Generated Gallery.mdx storybook file');
