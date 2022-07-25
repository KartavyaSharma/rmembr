import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	modulePathIgnorePatterns: [
		'<rootDir>/config/',
	],
	globalTeardown: '<rootDir>/test-teardown-globals.js'
}

export default config;