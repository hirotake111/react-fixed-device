module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  collectCoverageFrom: ["src/lib/**/*.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.js"],
};
