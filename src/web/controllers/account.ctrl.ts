import { Account } from '../../definitions/entities/account';

export default function(accountBusiness) {
  return {
    list: (req, res) => {
      return accountBusiness.getAll()
        .then((accounts: Account[]) => {
          res.json(accounts);
        });
    },
    create: (req, res) => {
      return accountBusiness.create(req.body)
        .then(() => res.json());
    }
  }
}
