import * as _ from 'lodash';

import CreateAccountBusiness from './../../../src/application/business/create-account.business';
import { UserContract } from './../../../src/application/entities/contracts/user.contract';
import { AccountContract } from './../../../src/application/entities/contracts/account.contract';
import { User } from './../../../src/application/entities/data/user';
import { Account, ACCOUNT } from './../../../src/application/entities/data/account';
import ErrorService from '../../../src/application/entities/services/error.service';

describe('CreateAccountBusiness', () => {
  it('should return error when user do not exists', async () => {
    expect.assertions(2);
    const UserMock = jest.fn<UserContract>(() => ({
      findById: jest.fn(async () => ({}))
    }));

    const AccountMock = jest.fn<AccountContract>(() => ({}));

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

      await createAccountBusiness.create(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith('user_not_found', { id: 1 });
    }
  });

  it('should return error when user do not exists (2)', async () => {
    expect.assertions(2);

    const UserMock = jest.fn<UserContract>(() => ({
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

    const AccountMock = jest.fn<AccountContract>(() => ({}));

    const createAccountBusiness = new CreateAccountBusiness(
      new AccountMock(),
      new UserMock(),
      errorService
    );
    try {

      await createAccountBusiness.create(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });

      expect(errorService.throw).toBeCalledWith('user_not_found', { id: 1 });
    }
  });

  it('should return error if account creation limit was reached', async () => {
    expect.assertions(2);

    const accounts: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT), { id: 1 });

    const UserMock = jest.fn<UserContract>(() => ({
      findById: jest.fn(async () => ({ id: 1 }))
    }));

    const AccountMock = jest.fn<AccountContract>(() => ({
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
      await createAccountBusiness.create(1, 'My account', 1000);
    } catch (e) {
      expect(e).toEqual({
        error: 'max_accounts_reached',
        message: 'Cannot create more accounts for this user'
      });

      expect(errorService.throw).toBeCalledWith('max_accounts_reached');
    }
  });

  it('should create account (user having no accounts)', async () => {
    expect.assertions(1);

    const UserMock = jest.fn<UserContract>(() => ({
      findById: jest.fn(async () => ({ id: 1 }))
    }));

    const AccountMock = jest.fn<AccountContract>(() => ({
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

    const account: Account = await createAccountBusiness.create(1, 'My account', 1000);

    expect(accountMock.create).toBeCalled();
  });

  it('should create account (user almost reaching accounts limit)', async () => {
    expect.assertions(1);

    const accounts: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT - 1), { id: 1 });

    const UserMock = jest.fn<UserContract>(() => ({
      findById: jest.fn(async () => (accounts)
    }));

    const AccountMock = jest.fn<AccountContract>(() => ({
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

    const account: Account = await createAccountBusiness.create(1, 'My account', 1000);

    expect(accountMock.create).toBeCalled();
  });
});