import { test, describe, mock } from 'node:test';
import { toUpperCase } from './utils';
import { strictEqual } from 'node:assert';

describe('node tests trials', () => {
  test('to upper case', () => {
    const actual = toUpperCase('abc');
    const expected = 'ABC';
    strictEqual(actual, expected);
  });

  test('test mock', () => {
    console.log(mock);
    const toUpperCaseMock = mock.fn((arg) => {
      return toUpperCase(arg);
    });

    strictEqual(toUpperCaseMock.mock.calls.length, 0);
    toUpperCaseMock('abc');
    strictEqual(toUpperCaseMock.mock.calls.length, 1);
  });
});
