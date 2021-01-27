module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  globals: {
    chrome: true,
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'max-len': ['error', {
      ignoreComments: true,
      code: 120,
      ignoreTemplateLiterals: true,
    }],
    'no-param-reassign': 0,
    'no-alert': 0,
    'no-new-func': 0,
  },
};
