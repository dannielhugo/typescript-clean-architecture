import { CustomError } from '../../../app/core/definitions/custom-error';

export class UserCreateErrorImpl extends CustomError {
  name = 'userCreateError';

  constructor() {
    super();
  }

  toString(): string {
    return `${this.name}:
    ${this.data}`;
  }
}
