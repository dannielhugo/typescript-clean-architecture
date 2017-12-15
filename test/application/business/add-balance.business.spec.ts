import AddBalanceBusiness from '../../../src/application/business/add-balance.business';
import { AccountRepository } from '../../../src/application/entities/repositories/account.repository';
import { Account } from '../../../src/application/entities/types/account';
import ErrorService from '../../../src/application/entities/services/error.service';
import { ErrorType } from '../../../src/application/entities/types/error-type';
import { UserRepository } from '../../../src/application/entities/repositories/user.repository';
import { User } from '../../../src/application/entities/types/user';

let account: Account;

const user: User = {
  id: 1,
  firstName: 'User',
  lastName: 'Lastname',
  document: '000'
};

describe.only('AddBalanceBusiness', () => {

  beforeEach(() => {
    account = {
      id: 1,
      balance: 0,
      userId: 1,
      description: 'Personal account'
    };
  });

  it('should add balance to account', async () => {
    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByIdAndUserId: async () => Promise.resolve(account),
      addBalance: async (accountId, amount) => {
        account.balance += amount;

        return Promise.resolve(account);
      }
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => Promise.resolve(user))
    }));

    const errorService = new ErrorServiceMock();
    const accountMock = new AccountMock();
    const userMock = new UserMock();

    const addBalanceBusiness: AddBalanceBusiness = new AddBalanceBusiness(
      accountMock,
      userMock,
      errorService
    );

    const userId = 1;
    const accountId = 1;
    const balance = 1000;

    const result: Account = await addBalanceBusiness.execute(userId, accountId, balance);

    expect(result.balance).toBe(1000);
  });

  it('should throw error if user does not exists', async () => {
    const AccountMock = jest.fn<AccountRepository>(() => ({}));

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => Promise.resolve({}))
    }));


    const ErrorServiceMock = jest.fn<ErrorService>(() => ({
      throw: jest.fn(async () => {
        return Promise.reject({
          error: 'user_not_found',
          message: 'The user \'1\' was not found'
        });
      })
    }));

    const errorService = new ErrorServiceMock();
    const accountMock = new AccountMock();
    const userMock = new UserMock();


    const addBalanceBusiness: AddBalanceBusiness = new AddBalanceBusiness(
      accountMock,
      userMock,
      errorService
    );

    const userId = 1;
    const accountId = 1;
    const balance = 1000;

    try {
      const result: Account = await addBalanceBusiness.execute(userId, accountId, balance);
    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith(ErrorType.USER_NOT_FOUND, { id: 1 });
    }
  });

  it('should throw error if account does not belongs to user', async () => {
    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByIdAndUserId: async () => Promise.resolve(null)
    }));

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => Promise.resolve(user))
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({
      throw: jest.fn(async () => {
        return Promise.reject({
          error: 'account_not_found',
          message: 'The account \'1\' was not found'
        });
      })
    }));

    const errorService = new ErrorServiceMock();
    const accountMock = new AccountMock();
    const userMock = new UserMock();

    const addBalanceBusiness: AddBalanceBusiness = new AddBalanceBusiness(
      accountMock,
      userMock,
      errorService
    );

    const userId = 1;
    const accountId = 1;
    const balance = 1000;

    try {
      const result: Account = await addBalanceBusiness.execute(userId, accountId, balance);
    } catch (e) {
      expect(e).toEqual({
        error: 'account_not_found',
        message: 'The account \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith(ErrorType.ACCOUNT_NOT_FOUND, { id: 1 });
    }
  });

});
