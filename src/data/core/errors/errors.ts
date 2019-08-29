import { DepositErrorImpl } from './deposit.err.impl';
import { GeneralErrorImpl } from './general.err.impl';
import { UserCreateErrorImpl } from './user-create.err.impl';
import { UserDoesNotExistsErrorImpl } from './user-does-not-exists.err.impl';
import { UserExistsErrorImpl } from './user-exists.err.impl';
import { ValidationErrorImpl } from './validation.err.impl';
import { UserHasNoBalanceErrorImpl } from './user-has-no-balance.err.impl';
import { TransferErrorImpl } from './transfer.err.impl';
import { CustomError } from '../../../app/core/definitions/custom-error';

export const ERRORS: Record<string, CustomError> = {
  general: new GeneralErrorImpl(),
  validation: new ValidationErrorImpl(),
  deposit: new DepositErrorImpl(),
  userDoesNotExists: new UserDoesNotExistsErrorImpl(),
  userCreate: new UserCreateErrorImpl(),
  userExists: new UserExistsErrorImpl(),
  userHasNoBalance: new UserHasNoBalanceErrorImpl(),
  transfer: new TransferErrorImpl(),
};
