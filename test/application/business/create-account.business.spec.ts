import * as _ from 'lodash';

import CreateAccountBusiness from './../../../src/application/business/create-account.business';
import { UserRepository } from './../../../src/application/entities/repositories/user.repository';
import { AccountRepository } from './../../../src/application/entities/repositories/account.repository';
import { User } from './../../../src/application/entities/types/user';
import { Account, ACCOUNT } from './../../../src/application/entities/types/account';
import ErrorService from '../../../src/application/entities/services/error.service';
import { ErrorType } from '../../../src/application/entities/types/error-type';

describe('CreateAccountBusiness', () => {
  it('should return error when user do not exists', async () => {
    expect.assertions(2);
    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => ({}))
    }));

    const AccountMock = jest.fn<AccountRepository>(() => ({}));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({
      throw: jest.fn(async () => {
        return Promise.reject({
          error: 'user_not_found',
          message: 'The user \'1\' was not found'
        });
      })
    }));

    const errorService = new ErrorServiceMock();

    const createAccountBusiness = new CreateAccountBusiness(
      new AccountMock(),
      new UserMock(),
      errorService
    );

    try {
      await createAccountBusiness.execute(1, 'My account', 1000);
    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith(ErrorType.USER_NOT_FOUND, { id: 1 });
    }
  });

  it('should return error when user do not exists (2)', async () => {
    expect.assertions(2);

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => (null))
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

    const AccountMock = jest.fn<AccountRepository>(() => ({}));

    const createAccountBusiness = new CreateAccountBusiness(
      new AccountMock(),
      new UserMock(),
      errorService
    );
    try {

      await createAccountBusiness.execute(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith(ErrorType.USER_NOT_FOUND, { id: 1 });
    }
  });

  it('should return error if account creation limit was reached', async () => {
    expect.assertions(2);

    const accounts: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT), { id: 1 });

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => ({ id: 1 }))
    }));

    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByUserId: jest.fn(async () => accounts)
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({
      throw: jest.fn(async () => {
        return Promise.reject({
          error: 'max_accounts_reached',
          message: 'Cannot create more accounts for this user'
        });
      })
    }));
    const errorService = new ErrorServiceMock();

    const createAccountBusiness = new CreateAccountBusiness(
      new AccountMock(),
      new UserMock(),
      errorService
    );

    try {
      await createAccountBusiness.execute(1, 'My account', 1000);
    } catch (e) {
      expect(e).toEqual({
        error: 'max_accounts_reached',
        message: 'Cannot create more accounts for this user'
      });

      expect(errorService.throw).toBeCalledWith(ErrorType.MAX_ACCOUNTS_REACHED);
    }
  });

  it('should create account (user having no accounts)', async () => {
    expect.assertions(1);

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => ({ id: 1 }))
    }));

    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByUserId: jest.fn(async () => ([])),
      create: jest.fn(async () => (<Account>{ id: 1 }))
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));


    const accountMock = new AccountMock();

    const createAccountBusiness = new CreateAccountBusiness(
      accountMock,
      new UserMock(),
      new ErrorServiceMock()
    );

    const account: Account = await createAccountBusiness.execute(1, 'My account', 1000);

    expect(accountMock.create).toBeCalled();
  });

  it('should create account (user almost reaching accounts limit)', async () => {
    expect.assertions(1);

    const accounts: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT - 1), { id: 1 });

    const UserMock = jest.fn<UserRepository>(() => ({
      findById: jest.fn(async () => (accounts)
    }));

    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByUserId: jest.fn(async () => ([])),
      create: jest.fn(async () => (<Account>{ id: 1 }))
    }));

    const ErrorServiceMock = jest.fn<ErrorService>(() => ({}));

    const accountMock = new AccountMock();

    const createAccountBusiness = new CreateAccountBusiness(
      accountMock,
      new UserMock(),
      new ErrorServiceMock()
    );

    const account: Account = await createAccountBusiness.execute(1, 'My account', 1000);

    expect(accountMock.create).toBeCalled();
  });
});