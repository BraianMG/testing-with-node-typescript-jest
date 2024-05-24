import { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server_app';
const baseTestDir = '<rootDir>/src/test/server_app';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/repo-original'],
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/**/*.ts`,
    '!<rootDir>/node_modules/**',
    '!<rootDir>/repo-original/**',
  ],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
