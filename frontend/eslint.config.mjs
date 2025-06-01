import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "react-hooks/rules-of-hooks": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      // "react/no-unescaped-entities": "off",
      // "@next/next/no-page-custom-font": "off",
    },
  }),
];

export default eslintConfig;
