import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';

import GetAccountBusiness from '../../../src/application/business/get-account.business';
import AccountContractMock from '../mock/account.contract.spec';
import UserContractMock from '../mock/user.contract.spec';

before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('GetAccountBusiness', () => {
  it('#findByUserId should resolve for an empty array', () => {
    const business = new GetAccountBusiness(
      new AccountContractMock(),
      new UserContractMock()
    );

    const result = business.findByUserId(1);
    result.should.eventually.be.empty;
  });
});
