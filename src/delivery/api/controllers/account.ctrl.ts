import { Account } from '../../../application/definitions/entities/account';

export default function(accountBusiness) {
  return {
    list: (req, res) => {
      return accountBusiness.getAll()
        .then((accounts: Account[]) => {
          res.json({status: 200, data: accounts});
        });
    },
    create: (req, res) => {
      return accountBusiness.create(req.body.owner, req.body.balance)
        .then(() => res.json({status: 200}));
    }
  };
}
