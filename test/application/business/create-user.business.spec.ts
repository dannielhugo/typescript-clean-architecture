import CreateUserBusiness from './../../../src/application/business/create-user.business';
import { UserContract } from './../../../src/application/entities/contracts/user.contract';
import { User, USER } from './../../../src/application/entities/data/user';

describe('CreateUserBusiness', () => {
  it('should return error when user already exists', async () => {
    expect.assertions(1);

    try {
      const Mock = jest.fn<UserContract>(() => ({
        findByDocument: jest.fn(async () => ({ user: 1 }))
      }));

      const createUserBusiness = new CreateUserBusiness(
        new Mock()
      );

      await createUserBusiness.create('name', 'lastname', 'doc');

    } catch (e) {
      expect(e).toEqual(
        USER.DUPLICATED_USER_ERROR
      );
    }
  });

  it('should create user if user is not found (1)', async () => {
    expect.assertions(1);

    const Mock = jest.fn<UserContract>(() => ({
      findByDocument: jest.fn(async () => ({})),
      create: jest.fn(async () => (<User>{ id: 1 })),
    }));

    const mock = new Mock();

    const createUserBusiness = new CreateUserBusiness(
      mock
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

    const mock = new Mock();

    const createUserBusiness = new CreateUserBusiness(
      mock
    );

    const user: User = await createUserBusiness.create('name', 'lastname', 'doc');

    expect(mock.create).toBeCalled();
  });
});