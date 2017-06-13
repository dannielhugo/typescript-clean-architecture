import { Account } from '../../../application/definitions/entities/account';

export default function(accountBusiness) {
  return {
    list: (req, res) => {
      return accountBusiness.getAll()
        .then((accounts: Account[]) => {
          res.json(accounts);
        });
    },
    create: (req, res) => {
      return accountBusiness.create(req.body.amount || 0)
        .then(() => res.json());
    }
  }
}
