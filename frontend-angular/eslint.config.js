// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const { FlatCompat } = require("@eslint/eslintrc");

const ng = require("@angular-eslint/eslint-plugin");
const ngTemplate = require("@angular-eslint/eslint-plugin-template");

const prettier = require("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  ...compat.extends(
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility"
  ),

  {
    files: ["**/*.ts"],
    processor: "@angular-eslint/template/extract-inline-html",
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,               
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    plugins: {
      "@angular-eslint": ng,
      "@angular-eslint/template": ngTemplate,
      prettier
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",

      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" }
      ]
    }
  },

  {
    files: ["**/*.html"],
  languageOptions: {
    parser: require("@angular-eslint/template-parser"),
  },
  plugins: { "@angular-eslint/template": ngTemplate },
  rules: {
  },
  }
);
