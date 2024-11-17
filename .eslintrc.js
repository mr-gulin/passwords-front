module.exports = {
    ignorePatterns: ['**/*.js', '**/*.mjs'],
    root: true,
    env: {
        browser: true,
        es6: true,
        es2017: true,
        node: true,
    },
    extends: ['next/core-web-vitals', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'react-hooks'],
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};
