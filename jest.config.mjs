export default {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};
