import {
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  describe.only('Traking callbacks with Jest mocks', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith('Invalid argument!');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(callBackMock).toHaveBeenCalledWith('called function with abc');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Traking callbacks', () => {
    //#region Simple implementation of a callback mock (handmade)
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }
    //#endregion

    afterEach(() => {
      // clearing traking fields:
      cbArgs = [];
      timesCalled = 0;
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument!');
      expect(timesCalled).toBe(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain('called function with abc');
      expect(timesCalled).toBe(1);
      // We cannot say anything about the arguments of the callback and whether it was actually invoked
    });
  });

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
