import eslint from '@eslint/js';
import globals from 'globals';

import typescript from 'typescript-eslint';

export default typescript.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': typescript.plugin,
    },
    extends: [eslint.configs.recommended, ...typescript.configs.recommended],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
