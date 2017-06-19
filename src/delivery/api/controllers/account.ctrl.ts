import { Account } from '../../../application/definitions/entities/account';

export default class AccountCtrl {
  constructor() { }

  list(req, res) {
    const accountBusiness = req.container.resolve('accountBusiness');

    return accountBusiness
      .findByUserId(req.params.userId)
      .then((accounts: Account[]) => {
        res.json({ status: 200, data: accounts });
      })
      .catch((err) => res.status(500).json({ status: 500, error_type: 'system', errors: err }));
  }

  create(req, res) {
    const accountBusiness = req.container.resolve('accountBusiness');

    return accountBusiness
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
