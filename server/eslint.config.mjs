import ts from 'typescript-eslint';

import js from '@eslint/js';
import globals from 'globals';

import eslint_plugin_simple_import_sort from 'eslint-plugin-simple-import-sort';

export default ts.config(
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
  },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    plugins: {
      'simple-import-sort': eslint_plugin_simple_import_sort,
    },
    rules: {
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
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { overrides: { constructors: 'no-public', properties: 'off' } },
      ],
    },
  },
);
