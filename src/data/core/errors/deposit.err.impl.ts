import { CustomError } from '../../../app/core/definitions/custom-error';

export class DepositErrorImpl extends CustomError {
  name = 'depositError';

  constructor() {
    super();
  }

  toString(): string {
    return `${this.name}:
    ${this.data}`;
  }
}
