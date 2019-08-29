import { Input } from '../core/definitions/input';

export interface SignupInput extends Input {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}
