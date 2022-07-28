import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	verbose: true,
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	testMatch: ["**/__tests__/**/*.test.ts?(x)"],
	modulePathIgnorePatterns: [
		'<rootDir>/config/',
		'<rootDir>/node_modules/',
		'<rootDir>/src/__tests__/utils/',
	],
	setupFilesAfterEnv: ['<rootDir>/test-setup-after-env.js'],
	globals: {
		'ts-jest': {
			compiler: 'ttypescript'
		}
	}
}

export default config;