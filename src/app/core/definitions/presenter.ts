import { Output } from './output';

export interface PresenterOutput {}

export interface Presenter<T extends Output> {
  present(data: T): Promise<PresenterOutput>;
}
