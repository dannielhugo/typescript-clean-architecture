import { ValidatorResult } from './validator-result';

export interface Validator<T> {
  validate(value: T): ValidatorResult;
}
