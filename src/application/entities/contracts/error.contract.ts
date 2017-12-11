import { ErrorType } from '../types/error-type';

export interface ErrorContract {
  getError(error: ErrorType): Promise<string> | Promise<null>;
}