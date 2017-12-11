import { Account } from '../../../application/entities/types/account';

export default class AccountCtrl {
  constructor() { }

  list(req, res) {
    const business = req.container.resolve('getAccountsBusiness');

    return business
      .getByUserId(req.params.userId)
      .then((accounts: Account[]) => {
        res.json({ status: 200, data: accounts });
      })
      .catch((err) => res.status(500).json({ status: 500, error_type: 'system', errors: err }));
  }

  create(req, res) {
    const business = req.container.resolve('createAccountBusiness');

    return business
      .create(
      parseInt(req.params.userId),
      req.body.description,
      req.body.balance
      )
      .then((account: Account) => {
        res.json({ status: 200, data: account });
      })
      .catch((err) => res.status(500).json({ status: 500, error_type: 'system', errors: err }));
  }
}
