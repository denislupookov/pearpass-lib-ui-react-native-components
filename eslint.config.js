import { eslintConfig } from 'tether-dev-docs'

export default [
  ...eslintConfig,
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^React$',
          ignoreRestSiblings: true
        }
      ]
    }
  }
]
