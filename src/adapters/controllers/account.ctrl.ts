import { Account } from '../../core/account';

interface AccountCtrl {
  list: Function;
  create: Function;
}

export default function(accountBusiness): AccountCtrl {
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
