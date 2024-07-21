// @ts-check

import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  { files: ["**/*.js", "**/*.ts"] },
  { ignores: ["dist", "node_modules"] },
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js", "*.ts"],
    extends: [tsEslint.configs.disableTypeChecked],
  },
);
