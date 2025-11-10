import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginImport from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      ".wrangler/**",
      "node_modules/**",
      "bin/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "public/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "*.yaml",
      "*.yml",
      "*.json",
      "*.jsonc",
    ],
  },
  {
    plugins: {
      import: eslintPluginImport,
      "@next/next": nextPlugin,
    },
    rules: {
      // Import rules
      "import/order": [
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
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
    },
  },
];

export default eslintConfig;
