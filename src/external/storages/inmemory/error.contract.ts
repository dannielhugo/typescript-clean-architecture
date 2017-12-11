import { ErrorContract } from '../../../application/entities/contracts/error.contract';
import { ErrorType } from '../../../application/entities/types/error-type';

const MESSAGES = {
  SERVER_ERROR: 'An internal server error occurred',
  USER_EXISTS: 'An user with supplied document already exists',
  USER_NOT_FOUND: 'The user \':id\' was not found',
  MAX_ACCOUNTS_REACHED: 'Cannot create more accounts for this user'
};

export default class InMemoryErrorContract implements ErrorContract {
  getError(error: ErrorType): Promise<string> | Promise<null> {
    return Promise.resolve(MESSAGES[ErrorType[error]]);
  }
}