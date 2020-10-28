const path = require('path');

module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: 'eslint:recommended',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        babelOptions: {
            configFile: path.resolve(__dirname, '.babelrc.js'),
        },
    },
    rules: {},
};
