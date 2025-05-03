module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    '@babel',
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 12,
  },
  rules: {
  },
  parser: '@babel/eslint-parser',
};
