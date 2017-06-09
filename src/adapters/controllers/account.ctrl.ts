import { Request } from 'awilix-express';
import { Response } from 'express';

import { Account } from '../../core/account';

export function list(req: Request, res: Response) {
  return req.container.resolve('accountBusiness').getAll()
    .then((accounts: Account[]) => {
        res.json(accounts);
    });
}
