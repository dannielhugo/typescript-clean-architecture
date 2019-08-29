import { ID } from '../core/definitions/id';
import { Interactor } from '../core/definitions/interactor';
import { User } from '../core/entities/user';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';

import { TransferInput } from './transfer.in';
import { TransferOutput } from './transfer.out';
import { TransferRepository } from './transfer.repository';
import { TransferValidator } from './transfer.validator';
import { ErrorType } from '../core/definitions/error-type';

export class TransferInteractor implements Interactor {
  constructor(
    private transferValidator: TransferValidator,
    private transferRepository: TransferRepository,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: TransferInput): Promise<TransferOutput> {
    const result = this.transferValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const [from, to] = await this.findUsers(request.from, request.to);

    if (!from) {
      throw this.errorFactory.getError(ErrorType.userDoesNotExists, request.from);
    }

    if (!to) {
      throw this.errorFactory.getError(ErrorType.userDoesNotExists, request.to);
    }

    const hasBalance = this.hasBalance(from, request.value);

    if (!hasBalance) {
      throw this.errorFactory.getError(ErrorType.userHasNoBalance, request.to);
    }

    try {
      const transactionId = await this.transfer(from, to, request.value);

      return Promise.resolve({ transactionId });
    } catch (error) {
      throw this.errorFactory.getError(ErrorType.transfer, request);
    }
  }

  private findUsers(from: ID, to: ID): Promise<[User | null, User | null]> {
    return Promise.all([this.transferRepository.findUserById(from), this.transferRepository.findUserById(to)]);
  }

  private hasBalance(user: User | null, value: number): boolean {
    return !!user && user.balance - value >= 0;
  }

  private transfer(from: User, to: User, value: number): Promise<ID> {
    from.balance -= value;
    to.balance += value;

    return this.transferRepository.transfer(from, to, value);
  }
}
