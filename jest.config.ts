import { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/pass_checker';
const baseTestDir = '<rootDir>/src/test/pass_checker';

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
