import { toUpperCase } from '../Utils';

describe('Utils test suite', () => {
  it('should return uppercase of valid string', () => {
    // arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    // act:
    const actual = sut('abc');

    // assert:
    expect(actual).toBe(expected);
  });
});
