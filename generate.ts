import fs from 'fs';
import path from 'path';

const SVG_DIR = './svg';
const ILLUSTRATIONS_DIR = './src/illustrations';
const TYPE_FILE_PATH = './src/types/Illustration.ts';

const kebabToPascalCase = (str: string) => {
  const camelCase = str.replace(/[-_]+([a-z])/g, (_, letter) => letter.toUpperCase());
  const sanitized = camelCase.replace(/[^a-zA-Z]/g, '');

  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
};

const readSVGFiles = (directory: string) => {
  return fs.readdirSync(directory).filter(file => file.endsWith('.svg'));
}

const modifySVGContent = (svgFilePath: string) => {
  let svgContent = fs.readFileSync(svgFilePath, 'utf8');

  svgContent = svgContent.replace('<svg ', '<svg :style="style" ');
  svgContent = svgContent.replace(/width="[^"]*" /g, '');
  svgContent = svgContent.replace(/fill="#6d07e8"/g, ':fill="color"');
  svgContent = svgContent.replace(/fill="#6c63ff"/g, ':fill="color"');
  svgContent = svgContent.replace(/height="([^"]*)"/g, ':height="size"');
  svgContent = svgContent.replace(/xmlns:xlink/g, 'xmlnsXlink');
  svgContent = svgContent.replace(/isolation="isolate"/g, ":style=\"{ isolation: 'isolate' }\"");
  svgContent = svgContent.replace(/style="isolation:isolate"/g, ":style=\"{ isolation: 'isolate' }\"");

  const regexPattern = /-(?!(?:data-|name))(\w)(?=(?:(?!(?:data-|"))[\w-])+="[^"]*")/g;
  svgContent = svgContent.replace(regexPattern, (_, letter) => letter.toUpperCase());

  const vueComponentContent = `<script setup lang="ts">
import { defineProps } from 'vue';
import type { UndrawIllustrationProps } from '../types';
defineProps<UndrawIllustrationProps>();
</script>

<template>
  ${svgContent}
</template>

<style scoped>
</style>
`;

  return vueComponentContent;
}

const writeVueComponents = (svgFiles: string[], directory: string, svgDir: string) => {
  const exportStatements = [''];
  const processedFiles = new Set<string>();

  svgFiles.forEach(file => {
    const svgFilePath = path.join(svgDir, file);

    const componentName = kebabToPascalCase(path.basename(file, '.svg'));

    if (!processedFiles.has(componentName)) {
      const outputFileName = `${componentName}.vue`;
      const vueComponentContent = modifySVGContent(svgFilePath);
      const outputFilePath = path.join(directory, outputFileName);

      fs.writeFileSync(outputFilePath, vueComponentContent);

      exportStatements.push(`export { default as ${componentName} } from './${componentName}.vue';`);
      processedFiles.add(componentName);
    }
  });

  const indexContent = exportStatements.join('\n');

  fs.writeFileSync(path.join(directory, 'index.ts'), indexContent);
}

const updateTypesFile = (svgFiles: string[], typesFilePath: string) => {
  const illustrations = svgFiles.map(file => {
    const componentName = kebabToPascalCase(path.basename(file, '.svg'));
    return `"${componentName}"`;
  });

  const typesContent = `export type Illustration = ${illustrations.join(' | ')};`;

  fs.writeFileSync(typesFilePath, typesContent);
}

const main = () => {
  const svgFiles = readSVGFiles(SVG_DIR);

  writeVueComponents(svgFiles, ILLUSTRATIONS_DIR, SVG_DIR);
  updateTypesFile(svgFiles, TYPE_FILE_PATH);
}

// Run the main function
main();
