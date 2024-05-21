jest.mock('../../app/doubles/OtherUtils', () => ({
  // With the following we maintain all the original implementations.
  // If we don't put it, all the implementations would be empty
  ...jest.requireActual('../../app/doubles/OtherUtils'),
  // Here we only override the implementation of the calculateComplexity method, the others are kept
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock('uuid', () => ({
  v4: () => '123',
}));

import * as OtherUtils from '../../app/doubles/OtherUtils';

describe('module tests', () => {
  test('calculate complexity', () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  test('keep other functions', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });

  test('string with id', () => {
    const result = OtherUtils.toLowerCaseWithId('ABC');
    console.log(result);
    expect(result).toBe('abc123');
  });
});
