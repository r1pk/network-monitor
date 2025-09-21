import ts from 'typescript-eslint';

import js from '@eslint/js';
import globals from 'globals';

import eslint_react_hooks_plugin from 'eslint-plugin-react-hooks';
import eslint_react_refresh_plugin from 'eslint-plugin-react-refresh';
import eslint_simple_sort_plugin from 'eslint-plugin-simple-import-sort';

import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', '*.config.{js,mjs}'],
  },
  js.configs.recommended,
  ts.configs.recommended,
  eslint_react_hooks_plugin.configs['recommended-latest'],
  eslint_react_refresh_plugin.configs.vite,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': eslint_simple_sort_plugin,
    },
    rules: {
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^node:'], ['^react$', '^react-dom/client$'], ['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']],
        },
      ],
      'object-shorthand': ['error', 'never'],
    },
  },
]);
