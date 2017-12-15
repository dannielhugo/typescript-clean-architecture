import CreateUserBusiness from './../../../src/application/business/create-user.business';
import { UserRepository } from './../../../src/application/entities/repositories/user.repository';
import { User } from './../../../src/application/entities/types/user';
import ErrorService from '../../../src/application/entities/services/error.service';
import { ErrorType } from '../../../src/application/entities/types/error-type';

describe('CreateUserBusiness', () => {
  it('should return error when user already exists', async () => {
    expect.assertions(2);
    const UserRepositoryMock = jest.fn<UserRepository>(() => ({
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
      new UserRepositoryMock(),
      errorServiceMock
    );

    try {
      await createUserBusiness.execute('name', 'lastname', 'doc');
    } catch (e) {
      expect(e).toEqual({
        error: 'user_exists',
        message: 'This user already exists'
      });

      expect(errorServiceMock.throw).toBeCalledWith(ErrorType.USER_EXISTS);
    }
  });

  it('should create user if user is not found (1)', async () => {
    expect.assertions(1);

    const UserRepositoryMock = jest.fn<UserRepository>(() => ({
      findByDocument: jest.fn(async () => ({})),
      create: jest.fn(async () => (<User>{ id: 1 })),
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const mock = new UserRepositoryMock();

    const createUserBusiness = new CreateUserBusiness(
      mock,
      new ErrorServiceMock()
    );

    const user: User = await createUserBusiness.execute('name', 'lastname', 'doc');

    expect(mock.create).toBeCalled();
  });

  it('should create user if user is not found (2)', async () => {
    expect.assertions(1);

    const Mock = jest.fn<UserRepository>(() => ({
      findByDocument: jest.fn(async () => null),
      create: jest.fn(async () => (<User>{ id: 1 })),
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const mock = new Mock();

    const createUserBusiness = new CreateUserBusiness(
      mock,
      new ErrorServiceMock()
    );

    const user: User = await createUserBusiness.execute('name', 'lastname', 'doc');

    expect(mock.create).toBeCalled();
  });
});