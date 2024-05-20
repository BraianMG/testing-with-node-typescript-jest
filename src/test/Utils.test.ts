import { getStringInfo, StringUtils, toUpperCase } from '../Utils';

describe('Utils test suite', () => {
  describe.only('StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      // console.log('Setup');
    });

    // afterEach(() => {
    //   // clearing mocks
    //   console.log('Teardown');
    // });

    it('Should return correct upperCase', () => {
      const actual = sut.toUpperCase('abc');
      expect(actual).toBe('ABC');
      console.log('Actual test');
    });
  });

  it('should return uppercase of valid string', () => {
    // arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    // act:
    const actual = sut('abc');

    // assert:
    expect(actual).toBe(expected);
  });

  describe('ToUpperCase examples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'My-String', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe('getStringInfo for arg My-String should', () => {
    test('return right length', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.characters).toHaveLength(9);
    });

    test('return right lower case', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.lowerCase).toBe('my-string');
    });

    test('return right upper case', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.upperCase).toBe('MY-STRING');
    });

    test('return right characters', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual(
        expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-']),
      );
    });

    test('return defined extra info', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.extraInfo).toBeDefined();
    });

    test('return right extra info', () => {
      // act:
      const actual = getStringInfo('My-String');

      // assert:
      expect(actual.extraInfo).toEqual({});
    });
  });
});
