import * as _ from 'lodash';

import GetAccountsBusiness from './../../../src/application/business/get-accounts.business';
import { AccountRepository } from './../../../src/application/entities/repositories/account.repository';
import { Account, ACCOUNT } from './../../../src/application/entities/types/account';


describe('GetAccountsBusiness', () => {
  it('should return no accounts', async () => {
    expect.assertions(1);

    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByUserId: (async () => [])
    }));

    const getAccountBusiness = new GetAccountsBusiness(
      new AccountMock()
    );

    const accounts: Account[] = await getAccountBusiness.execute(1);

    expect(accounts.length).toBe(0);

  });


  it('should return an account array', async () => {
    expect.assertions(1);

    const list: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT), { id: 1 });

    const AccountMock = jest.fn<AccountRepository>(() => ({
      findByUserId: (async () => list)
    }));

    const getAccountBusiness = new GetAccountsBusiness(
      new AccountMock()
    );

    const accounts: Account[] = await getAccountBusiness.execute(1);

    expect(accounts.length).toBe(ACCOUNT.MAX_ACCOUNTS_LIMIT);

  });
});