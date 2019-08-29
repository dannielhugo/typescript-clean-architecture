import { Interactor } from '../core/definitions/interactor';
import { Transaction, TRANSACTION_TYPES } from '../core/entities/transaction';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';

import { DepositInput } from './deposit.in';
import { DepositOutput } from './deposit.out';
import { DepositRepository } from './deposit.repository';
import { DepositValidator } from './deposit.validator';
import { ErrorType } from '../core/definitions/error-type';

export class DepositInteractor implements Interactor {
  constructor(
    private depositValidator: DepositValidator,
    private errorFactory: ApplicationErrorFactory,
    private depositRepository: DepositRepository,
  ) {}

  async execute(request: DepositInput): Promise<DepositOutput> {
    const result = this.depositValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const user = await this.depositRepository.findUserById(request.userId);

    if (!user) {
      throw this.errorFactory.getError(ErrorType.userDoesNotExists, { id: request.userId });
    }

    try {
      user.balance += request.value;
      await this.depositRepository.saveUser(user);

      const transaction = new Transaction(user, user, request.value, TRANSACTION_TYPES.DEPOSIT);

      const transactionId = await this.depositRepository.createTransaction(transaction);

      return Promise.resolve({ balance: user.balance, transactionId } as DepositOutput);
    } catch (error) {
      throw this.errorFactory.getError(ErrorType.deposit, error);
    }
  }
}
