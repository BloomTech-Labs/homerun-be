module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    plugins: ['prettier'],
    rules: {
      'no-unused-vars': ['off', { args: 'none' }],

      'eol-last': ['off', 'never'],
      'linebreak-style': ['off', 'windows'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    overrides: [
      {
        files: ['**/*.test.js'],
        env: {
          jest: true,
        },
      },
    ],
  },
};
