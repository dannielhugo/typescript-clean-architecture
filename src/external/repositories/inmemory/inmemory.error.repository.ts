import { ErrorRepository } from '../../../application/entities/repositories/error.repository';
import { ErrorType } from '../../../application/entities/types/error-type';

const MESSAGES = {
  SERVER_ERROR: 'An internal server error occurred',
  USER_EXISTS: 'An user with supplied document already exists',
  USER_NOT_FOUND: 'The user \':id\' was not found',
  MAX_ACCOUNTS_REACHED: 'Cannot create more accounts for this user',
  ACCOUNT_NOT_FOUND: 'The account \':id\' was not found'
};

export default class InMemororyErrorRepository implements ErrorRepository {
  getError(error: ErrorType): Promise<string> | Promise<null> {
    return Promise.resolve(MESSAGES[ErrorType[error]]);
  }
}