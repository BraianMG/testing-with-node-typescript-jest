import { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server_app';
const baseTestDir = '<rootDir>/src/test/server_app3';

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
  testMatch: [`${baseTestDir}/**/*test.ts`],
  setupFiles: ['<rootDir>/src/test/server_app3/utils/config.ts'],
};

export default config;
