module.exports = {
    roots: [""],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js"],
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    coverageReporters: ["html", "lcov"],
    setupFilesAfterEnv: ["./jest.config.js"], 
    globals: {
      'ts-jest': {
        diagnostics: false, 
      },
    },
  };

  