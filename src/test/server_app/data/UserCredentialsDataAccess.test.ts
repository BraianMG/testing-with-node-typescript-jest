import { DataBase } from '../../../app/server_app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server_app/data/UserCredentialsDataAccess';
import { Account } from '../../../app/server_app/model/AuthModel';

//#region This is the way we can inject mocks into consumer classes
const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      // Here we only call the constructor
      return {
        // Here we have the references to the objects to simulate different behaviors of the system
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});
//#endregion

describe('UserCredentialsDataAccess test suite', () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: '',
    password: 'somePassword',
    userName: 'someUserName',
  };

  const someId = '1234';

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add user and return the id', async () => {
    insertMock.mockResolvedValueOnce(someId);

    const actualId = await sut.addUser(someAccount);

    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it('should get user by id', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = await sut.getUserById(someId);

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('id', someId);
  });

  it('should get user by name', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = await sut.getUserByUserName(someAccount.userName);

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
  });
});
