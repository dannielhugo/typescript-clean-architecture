import { TransferInteractor } from './transfer.interactor';
import { TestEnvironment } from '../../test-environment';
import { TransferInput } from './transfer.in';
import { TransferOutput } from './transfer.out';
import { ValidatorResult } from '../core/definitions/validator-result';

const validatorResult: ValidatorResult = { valid: true, error: null };
const insertResult = { id: 10 };
const from = { id: 1, balance: 10000 };
const to = { id: 2, balance: 10000 };

function isTransferOutput(output: TransferOutput): output is TransferOutput {
  return (output as TransferOutput) !== undefined;
}

describe('transfer interactor', () => {
  let interactor: TransferInteractor;
  let transferValidator;
  let transferRepository;
  let errorFactory;

  beforeEach(() => {
    transferValidator = {
      validate: jest.fn(() => {
        return validatorResult;
      }),
    };

    transferRepository = {
      findUserById: jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(from))
        .mockReturnValueOnce(Promise.resolve(to)),
      transfer: jest.fn(async () => Promise.resolve(insertResult)),
    };

    errorFactory = {
      getError: jest.fn(() => new Error('user')),
    };

    interactor = TestEnvironment.createInstance(TransferInteractor, [
      {
        name: 'transferValidator',
        useValue: transferValidator,
      },
      {
        name: 'transferRepository',
        useValue: transferRepository,
      },
      {
        name: 'errorFactory',
        useValue: errorFactory,
      },
    ]) as TransferInteractor;
  });

  describe('execute', () => {
    it('should works', async () => {
      const request: TransferInput = {
        from: 1,
        to: 2,
        value: 100,
      };

      const response = await interactor.execute(request);
      const isCorrectResponse = isTransferOutput(response);
      expect(isCorrectResponse).toBeTruthy();
    });
  });
});
