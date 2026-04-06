export default {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  modulePaths: ['<rootDir>', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '^pearpass-lib-ui-theme-provider/native$':
      '<rootDir>/node_modules/pearpass-lib-ui-theme-provider/native/index.js',
    '^pearpass-lib-ui-theme-provider$':
      '<rootDir>/node_modules/pearpass-lib-ui-theme-provider/src/index.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-reanimated|styled-components|@testing-library/react-native|pearpass-lib-ui-theme-provider|pearpass-lib-ui-theme-provider/native|pearpass-lib-ui-react-native-components|react-strict-dom)/)'
  ],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}']
}
