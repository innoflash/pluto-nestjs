module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "prefer-arrow-callback": "error",
    "curly": "error",
    "eol-last": "error",
    "no-duplicate-imports": "error",
    "no-console": "warn",
    "indent": [
      "error",
      2
    ],
    "max-len": [
      "error",
      140
    ],
    "eqeqeq": [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    "prefer-const": "error",
    "newline-before-return": "error",
    "no-const-assign": "error",
    "no-empty": "error",
    "no-invalid-regexp": "error",
    "semi": "off",
    "quotes": [
      "error",
      "single"
    ],
    "@typescript-eslint/semi": [
      "error"
    ]
  },
};
