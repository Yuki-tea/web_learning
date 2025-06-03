import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";


export default defineConfig([
  {
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      strict: ["error", "global"],
    },
  },

  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
]);
