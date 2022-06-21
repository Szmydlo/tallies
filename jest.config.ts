import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.jest.json",
			useESM: true,
		},
	},
	testPathIgnorePatterns: ["./tests/"],
	collectCoverage: true,
	collectCoverageFrom: [
		"**/*.{js,jsx}",
		"**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!**/__tests__/**",
		"!**/.*/**",
		"!**/*.config.*",
		"!**/coverage/**",
		"!next-env.d.ts",
	],
	coverageDirectory: "./.nyc_output",
	coverageReporters: ["json"],
};
export default config;
