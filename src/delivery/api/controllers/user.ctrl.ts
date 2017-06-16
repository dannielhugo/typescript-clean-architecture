import { User } from '../../../application/definitions/entities/user';

export default function(userBusiness) {
  return {
    create: (req, res) => {
      return userBusiness
        .create(
        req.body.first_name,
        req.body.last_name,
        req.body.document
        )
        .then((user: User) => res.json({ status: 200, udata: user }));
    }
  };
}
