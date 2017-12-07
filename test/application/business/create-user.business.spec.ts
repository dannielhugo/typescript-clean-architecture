import CreateUserBusiness from './../../../src/application/business/create-user.business';
import { UserContract } from './../../../src/application/entities/contracts/user.contract';
import { User } from './../../../src/application/entities/data/user';
import ErrorService from '../../../src/application/entities/services/error.service';

describe('CreateUserBusiness', () => {
  it('should return error when user already exists', async () => {
    expect.assertions(2);
    const UserContractMock = jest.fn<UserContract>(() => ({
      findByDocument: jest.fn(async () => ({ user: 1 }))
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({
      throw: jest.fn(async () => {
        return Promise.reject({
          error: 'user_exists',
          message: 'This user already exists'
        });
      })
    }));

    const errorServiceMock = new ErrorServiceMock();

    const createUserBusiness = new CreateUserBusiness(
      new UserContractMock(),
      errorServiceMock
    );

    try {
      await createUserBusiness.create('name', 'lastname', 'doc');
    } catch (e) {
      expect(e).toEqual({
        error: 'user_exists',
        message: 'This user already exists'
      });

      expect(errorServiceMock.throw).toBeCalledWith('user_exists');
    }
  });

  it('should create user if user is not found (1)', async () => {
    expect.assertions(1);

    const UserContractMock = jest.fn<UserContract>(() => ({
      findByDocument: jest.fn(async () => ({})),
      create: jest.fn(async () => (<User>{ id: 1 })),
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const mock = new UserContractMock();

    const createUserBusiness = new CreateUserBusiness(
      mock,
      new ErrorServiceMock()
    );

    const user: User = await createUserBusiness.create('name', 'lastname', 'doc');

    expect(mock.create).toBeCalled();
  });

  it('should create user if user is not found (2)', async () => {
    expect.assertions(1);

    const Mock = jest.fn<UserContract>(() => ({
      findByDocument: jest.fn(async () => null),
      create: jest.fn(async () => (<User>{ id: 1 })),
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const mock = new Mock();

    const createUserBusiness = new CreateUserBusiness(
      mock,
      new ErrorServiceMock()
    );

    const user: User = await createUserBusiness.create('name', 'lastname', 'doc');

    expect(mock.create).toBeCalled();
  });
});