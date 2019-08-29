import { CustomError } from '../../../app/core/definitions/custom-error';

export class UserDoesNotExistsErrorImpl extends CustomError {
  name = 'userDoesNotExistsError';

  constructor() {
    super();
  }

  toString(): string {
    return `${this.name}:
    ${JSON.stringify(this.data, null, 2)}`;
  }
}
