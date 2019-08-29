import { ID } from '../definitions/id';

import { Entity } from './entity';

export class User implements Entity {
  id?: ID;
  balance = 0;

  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public username: string,
    public password: string,
  ) {}
}
