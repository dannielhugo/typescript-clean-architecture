import { DepositInteractor } from './deposit.interactor';
import { TestEnvironment } from '../../test-environment';
import { DepositInput } from './deposit.in';
import { DepositOutput } from './deposit.out';
import { ValidatorResult } from '../core/definitions/validator-result';

function isDepositOutput(output: DepositOutput): output is DepositOutput {
  return (output as DepositOutput) !== undefined;
}

describe('deposit interactor', () => {
  const validatorResult: ValidatorResult = { valid: true, error: null };
  const saveResult = true;
  const createResult = { id: 1 };
  const user = {
    firstname: 'JOHN',
    lastname: 'Connan',
    email: 'johnconnan@jk.com',
    username: 'johnconnan',
    password: 'passwd',
    id: 1,
  };

  let interactor: DepositInteractor;
  let depositValidator;
  let depositRepository;
  let errorFactory;

  beforeEach(() => {
    depositValidator = {
      validate: jest.fn(() => {
        return validatorResult;
      }),
    };

    depositRepository = {
      findUserById: jest.fn(async () => Promise.resolve(user)),
      saveUser: jest.fn(async () => Promise.resolve(saveResult)),
      createTransaction: jest.fn(async () => Promise.resolve(createResult)),
    };

    errorFactory = {
      getError: jest.fn(() => new Error('error')),
    };

    interactor = TestEnvironment.createInstance(DepositInteractor, [
      {
        name: 'depositValidator',
        useValue: depositValidator,
      },
      {
        name: 'depositRepository',
        useValue: depositRepository,
      },
      {
        name: 'errorFactory',
        useValue: errorFactory,
      },
    ]) as DepositInteractor;
  });

  describe('execute', () => {
    it('should works', async () => {
      const request: DepositInput = {
        userId: 1,
        value: 100,
      };

      const response = await interactor.execute(request);
      const isCorrectResponse = isDepositOutput(response);
      expect(isCorrectResponse).toBeTruthy();
    });
  });
});
