export default {
    roots: ["src"],
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
    modulePaths: ["<rootDir>"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
