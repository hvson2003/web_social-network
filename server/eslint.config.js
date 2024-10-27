import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    },
  },
  pluginJs.configs.recommended,
];
