module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    // 'jest/globals': true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'space-before-function-paren': ['error', 'never']
  }
}
