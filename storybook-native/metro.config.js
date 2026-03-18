const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the parent library for source changes and shared deps
config.watchFolders = [libraryRoot];

// Resolve packages from both this app's and the parent's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(libraryRoot, 'node_modules'),
];

// Block the parent's copies of react/react-native and native libraries
// so that ALL imports resolve to the Expo app's single copy
const parentNM = path.resolve(libraryRoot, 'node_modules');
config.resolver.blockList = [
  new RegExp(`${parentNM.replace(/[/\\]/g, '[/\\\\]')}/react/.*`),
  new RegExp(`${parentNM.replace(/[/\\]/g, '[/\\\\]')}/react-native/.*`),
  new RegExp(`${parentNM.replace(/[/\\]/g, '[/\\\\]')}/react-native-svg/.*`),
  new RegExp(`${parentNM.replace(/[/\\]/g, '[/\\\\]')}/react-native-reanimated/.*`),
  new RegExp(`${parentNM.replace(/[/\\]/g, '[/\\\\]')}/react-native-gesture-handler/.*`),
];

module.exports = withStorybook(config);
