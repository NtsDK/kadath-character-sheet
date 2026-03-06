import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

import { defineConfig } from "eslint/config";

export default defineConfig(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      eslintPluginUnicorn.configs.recommended,
    ],
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import-plugin": importPlugin,
      unicorn: eslintPluginUnicorn,
    },
    // settings: {
    //   "import/parsers": {
    //     "@typescript-eslint/parser": [".ts", ".tsx"],
    //   },
    //   "import/resolver": {
    //     // You will also need to install and configure the TypeScript resolver
    //     // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
    //     // typescript: true,
    //     typescript: {
    //       "alwaysTryTypes": true,
    //     },
    //   },
    // },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      ...eslintPluginUnicorn.configs.recommended.rules,
      // import
      "import-plugin/no-useless-path-segments": "error",
      "import-plugin/no-default-export": "error",
      "import-plugin/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [".", ".."],
          patterns: [
            // запрет на импорт из page.charSheet и page.catalog в обход index.ts
            "*/page.charSheet/*",
            "*/page.catalog/*",
            // запрет на импорт из infrastructure изнутри, только через index.ts
            "*/infrastructure/*",
          ],
        },
      ],
      // typescript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      // unicorn
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/prefer-switch": "off",
      "unicorn/no-array-sort": "off",
    },
  },
  {
    // запрет на импорт из infrastructure, кроме IoC
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/IoC/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["../infrastructure"],
          patterns: ["../infrastructure/*"],
        },
      ],
    },
  },
);
