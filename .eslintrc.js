module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'import/extensions': 0,
    'no-shadow': ['error', { allow: ['state'] }],
    'no-lonely-if': [0, 'error'],
    'import/no-self-import': [0, 'error'],
    'import/prefer-default-export': [0, 'error'],
    'func-names': [0, 'error'],
    'global-require': [0, 'error'],
    'no-underscore-dangle': [0, 'error'],
    'no-unused-expressions': [0, 'errror'],
    'no-param-reassign': [0, 'error'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
