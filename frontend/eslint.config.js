import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierESLint from 'prettier-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettierESLint },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended
      ...eslintConfigPrettier.rules, // disables conflicting rules
      'prettier/prettier': 'error', // show Prettier issues as ESLint errors
    },
  },
]);
