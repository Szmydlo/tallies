// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["./tests/"],
	// collectCoverage: true,
	// collectCoverageFrom: [
	// 	"**/*.{js,jsx}",
	// 	"**/*.{ts,tsx}",
	// 	"!**/node_modules/**",
	// 	"!**/__tests__/**",
	// 	"!**/.*/**",
	// 	"!**/*.config.*",
	// 	"!**/coverage/**",
	// 	"!next-env.d.ts",
	// ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
