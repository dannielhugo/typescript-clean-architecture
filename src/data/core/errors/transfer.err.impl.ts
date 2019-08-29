import { CustomError } from '../../../app/core/definitions/custom-error';

export class TransferErrorImpl extends CustomError {
  name = 'transferError';

  constructor() {
    super();
  }

  toString(): string {
    return `${this.name}:
    ${this.data}`;
  }
}
