import { ErrorType } from '../types/error-type';

/**
 *  Interface that describes error functions
 */
export interface ErrorRepository {
  getError(error: ErrorType): Promise<string> | Promise<null>;
}