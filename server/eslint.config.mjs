import ts from 'typescript-eslint';

import js from '@eslint/js';
import globals from 'globals';

import eslint_simple_sort_plugin from 'eslint-plugin-simple-import-sort';

export default ts.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': ts.plugin,
      'simple-import-sort': eslint_simple_sort_plugin,
    },
    extends: [js.configs.recommended, ...ts.configs.recommended],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { overrides: { constructors: 'no-public', properties: 'off' } },
      ],
      'object-shorthand': ['error', 'never'],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^node:'], ['^@nestjs/'], ['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']],
        },
      ],
    },
  },
);
