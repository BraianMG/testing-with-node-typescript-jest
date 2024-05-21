import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe.skip('OtherUtils test suite', () => {
  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('asd');
      expect(toUpperCaseSpy).toHaveBeenCalledWith('asd');
    });

    test('Use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    test('Use a spy to replace the implementation of a method', () => {
      // We can put as any to avoid TypeScript and thus, for example, be able to access private methods.
      // This can only be done in cases of emergency
      jest.spyOn(sut, 'callExternalService').mockImplementation(() => { // Here: sut as any
        console.log('calling mocked implementation!!!');
      });
      sut.callExternalService(); // Here (sut as any)
    });
  });

  describe('Traking callbacks with Jest mocks', () => {
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
