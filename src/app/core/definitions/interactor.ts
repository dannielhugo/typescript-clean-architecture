import { Input } from './input';
import { Output } from './output';

export interface Interactor {
  execute(request: Input): Promise<Output>;
}
