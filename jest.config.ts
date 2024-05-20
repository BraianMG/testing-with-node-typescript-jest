import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/repo-original'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/repo-original/**',
  ],
};

export default config;
