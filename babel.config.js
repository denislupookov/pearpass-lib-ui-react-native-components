export default {
  presets: [
    'react-strict-dom/babel-preset',
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: 'commonjs'
      }
    ],
    'module:@react-native/babel-preset'
  ]
}
