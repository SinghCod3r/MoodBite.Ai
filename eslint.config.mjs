import nextPlugin from "@next/eslint-plugin-next";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"]
  },
  nextPlugin.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];

export default config;
