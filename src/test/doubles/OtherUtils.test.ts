import {
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  it('ToUpperCase - calls callback for invalid argument', () => {
    // The function () => {} is our fake implementation
    const actual = toUpperCaseWithCb('', () => {});
    expect(actual).toBeUndefined();
    // We cannot say anything about the arguments of the callback and whether it was actually invoked
  });

  it('ToUpperCase - calls callback for valid argument', () => {
    // The function () => {} is our fake implementation
    const actual = toUpperCaseWithCb('abc', () => {});
    expect(actual).toBe('ABC');
    // We cannot say anything about the arguments of the callback and whether it was actually invoked
  });

  it('Calculates complexity', () => {
    // someInfo is a stub
    const someInfo = {
      length: 5,
      extraInfo: { field1: 'someInfo', field2: 'someOtherInfo' },
    };
    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
