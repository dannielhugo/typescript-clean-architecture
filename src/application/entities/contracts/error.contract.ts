import { ErrorType } from '../types/error-type';

/**
 *  Interface that describes error functions
 */
export interface ErrorContract {
  getError(error: ErrorType): Promise<string> | Promise<null>;
}