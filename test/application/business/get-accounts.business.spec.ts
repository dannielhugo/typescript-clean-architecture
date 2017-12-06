import * as _ from 'lodash';

import GetAccountsBusiness from './../../../src/application/business/get-accounts.business';
import { AccountContract } from './../../../src/application/entities/contracts/account.contract';
import { Account, ACCOUNT } from './../../../src/application/entities/data/account';


describe('GetAccountsBusiness', () => {
  it('should return no accounts', async () => {
    expect.assertions(1);

    const AccountMock = jest.fn<AccountContract>(() => ({
      findByUserId: (async () => [])
    }));

    const getAccountBusiness = new GetAccountsBusiness(
      new AccountMock()
    );

    const accounts: Account[] = await getAccountBusiness.getByUserId(1);

    expect(accounts.length).toBe(0);

  });


  it('should return an account array', async () => {
    expect.assertions(1);

    const list: Account[] = <Account[]>_.fill(Array(ACCOUNT.MAX_ACCOUNTS_LIMIT), { id: 1 });

    const AccountMock = jest.fn<AccountContract>(() => ({
      findByUserId: (async () => list)
    }));

    const getAccountBusiness = new GetAccountsBusiness(
      new AccountMock()
    );

    const accounts: Account[] = await getAccountBusiness.getByUserId(1);

    expect(accounts.length).toBe(ACCOUNT.MAX_ACCOUNTS_LIMIT);

  });
});