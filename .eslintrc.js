module.exports = {
    parserOptions: {
        "ecmaVersion": "latest"
    },
    env: {
        "node": true,
        "es6": true
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    plugins: [
        'prettier',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                printWidth: 80,
                tabWidth: 2,
                trailingComma: 'all',
                semi: true,
                singleQuote: true,
            },
        ],
    },
};
