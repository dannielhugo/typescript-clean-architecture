import { Err } from './err';

import { CustomError } from './custom-error';

export interface ApplicationErrorFactory {
  getError(name: string, data?: Err): CustomError;
}
