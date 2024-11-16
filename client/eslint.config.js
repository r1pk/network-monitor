import js from '@eslint/js';
import globals from 'globals';

import eslint_react_plugin from 'eslint-plugin-react';
import eslint_react_hooks_plugin from 'eslint-plugin-react-hooks';
import eslint_react_refresh_plugin from 'eslint-plugin-react-refresh';
import eslint_simple_sort_plugin from 'eslint-plugin-simple-import-sort';

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
    plugins: {
      'react': eslint_react_plugin,
      'react-hooks': eslint_react_hooks_plugin,
      'react-refresh': eslint_react_refresh_plugin,
      'simple-import-sort': eslint_simple_sort_plugin,
    },
    rules: {
      // recommended rules
      ...js.configs.recommended.rules,
      ...eslint_react_plugin.configs.recommended.rules,
      ...eslint_react_plugin.configs['jsx-runtime'].rules,
      ...eslint_react_hooks_plugin.configs.recommended.rules,

      // rules
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^node:'], ['^react$', '^react-dom/client$'], ['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']],
        },
      ],
    },
  },
];
