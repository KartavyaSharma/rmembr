import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	modulePathIgnorePatterns: [
		'<rootDir>/config/',
		'<rootDir>/node_modules/',
		'<rootDir>/src/__tests__/utils/',
	],
	globalTeardown: '<rootDir>/test-teardown-globals.js',
	setupFilesAfterEnv: ['<rootDir>/test-setup-after-env.js'],
}

export default config;