import * as _ from 'lodash';

import CreateAccountBusiness from './../../../src/application/business/create-account.business';
import { UserContract } from './../../../src/application/entities/contracts/user.contract';
import { AccountContract } from './../../../src/application/entities/contracts/account.contract';
import { User, USER } from './../../../src/application/entities/data/user';
import { Account, ACCOUNT } from './../../../src/application/entities/data/account';

describe('CreateAccountBusiness', () => {
  it('should return error when user do not exists', async () => {
    expect.assertions(1);

    try {
      const UserMock = jest.fn<UserContract>(() => ({
        findById: jest.fn(async () => ({}))
      }));

      const AccountMock = jest.fn<AccountContract>(() => ({}));

      const createAccountBusiness = new CreateAccountBusiness(
        new AccountMock(),
        new UserMock()
      );

      await createAccountBusiness.create(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual(
        USER.MISSING_USER_ERROR
      );
    }
  });

  it('should return error when user do not exists (2)', async () => {
    expect.assertions(1);

    try {
      const UserMock = jest.fn<UserContract>(() => ({
        findById: jest.fn(async () => (null))
      }));

      const AccountMock = jest.fn<AccountContract>(() => ({}));

      const createAccountBusiness = new CreateAccountBusiness(
        new AccountMock(),
        new UserMock()
      );

      await createAccountBusiness.create(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual(
        USER.MISSING_USER_ERROR
      );
    }
  });

  it('should return error if account creation limit was reached', async () => {
    expect.assertions(1);

    const accounts: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT), { id: 1 });

    try {
      const UserMock = jest.fn<UserContract>(() => ({
        findById: jest.fn(async () => ({ id: 1 }))
      }));

      const AccountMock = jest.fn<AccountContract>(() => ({
        findByUserId: jest.fn(async () => accounts)
      }));

      const createAccountBusiness = new CreateAccountBusiness(
        new AccountMock(),
        new UserMock()
      );

      await createAccountBusiness.create(1, 'My account', 1000);

    } catch (e) {
      expect(e).toEqual(
        ACCOUNT.MAX_ACCOUNTS_ERROR
      );
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
    const accountMock = new AccountMock();

    const createAccountBusiness = new CreateAccountBusiness(
      accountMock,
      new UserMock()
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
    const accountMock = new AccountMock();

    const createAccountBusiness = new CreateAccountBusiness(
      accountMock,
      new UserMock()
    );

    const account: Account = await createAccountBusiness.create(1, 'My account', 1000);

    expect(accountMock.create).toBeCalled();
  });
});