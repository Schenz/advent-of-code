import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
    // Ignore patterns (replacing .eslintignore)
    {
        ignores: ['node_modules/**', 'build/**', 'coverage/**', 'dist/**', 'jest.config.js'],
    },

    // Base recommended configs
    eslint.configs.recommended,

    // TypeScript and custom configuration
    {
        files: ['**/*.ts', '**/*.js'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettier,
        },
        rules: {
            // TypeScript recommended rules
            ...tsPlugin.configs.recommended.rules,
            ...prettierConfig.rules,

            // Custom rules
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 1,
            'prettier/prettier': 'error',
            curly: ['error', 'all'],
            'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
            'newline-after-var': ['error', 'always'],
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'function' },
                { blankLine: 'always', prev: 'function', next: '*' },
                { blankLine: 'always', prev: 'function', next: 'return' },
                { blankLine: 'always', prev: 'function', next: 'try' },
                { blankLine: 'always', prev: 'function', next: 'if' },
                { blankLine: 'always', prev: '*', next: 'try' },
                { blankLine: 'always', prev: '*', next: 'if' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/naming-convention': 'error',
            '@typescript-eslint/array-type': 'error',
        },
    },

    // Override for main.ts files
    {
        files: ['**/main.ts'],
        rules: {
            'no-console': 0,
        },
    },

    // Test files configuration
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
];
