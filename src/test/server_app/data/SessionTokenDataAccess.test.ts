import { SessionTokenDataAccess } from '../../../app/server_app/data/SessionTokenDataAccess';
import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';
import { Account } from '../../../app/server_app/model/AuthModel';

//#region This is the way we can inject mocks into consumer classes
const mockInsert = jest.fn();
const mockGetBy = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      // Here we only call the constructor
      return {
        // Here we have the references to the objects to simulate different behaviors of the system
        insert: mockInsert,
        getBy: mockGetBy,
        update: mockUpdate,
      };
    }),
  };
});
//#endregion

const someAccount: Account = {
  id: '',
  password: 'somePassword',
  userName: 'someUserName',
};

describe('SessionTokenDataAccess test suite', () => {
  let sut: SessionTokenDataAccess;
  const fakeId = '1234';

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(global.Date, 'now').mockReturnValue(0);
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValueOnce(fakeId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate token for account', async () => {
    mockInsert.mockResolvedValueOnce(fakeId);
    const actualTokenId = await sut.generateToken(someAccount);

    expect(actualTokenId).toBe(fakeId);
    expect(mockInsert).toHaveBeenCalledWith({
      id: '',
      userName: someAccount.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60),
    });
  });

  it('should invalidate token', async () => {
    await sut.invalidateToken(fakeId);

    expect(mockUpdate).toHaveBeenCalledWith(fakeId, 'valid', false);
  });

  it('should check valid token', async () => {
    mockGetBy.mockResolvedValueOnce({ valid: true });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(true);
  });

  it('should check invalid token', async () => {
    mockGetBy.mockResolvedValueOnce({ valid: false });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });

  it('should check inexistent token', async () => {
    mockGetBy.mockResolvedValueOnce(undefined);

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });
});
