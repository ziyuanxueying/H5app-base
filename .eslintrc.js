/*
 * @Author: 吴占超
 * @Date: 2019-08-16 14:04:24
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-10-22 19:43:12
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "uni": true,
    "getApp": true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 分号
    semi: ['error', 'always'],
    // 函数调用时 函数名与()之间不能有空格
    'space-before-function-paren': [2, { anonymous: 'never', named: 'never' }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
