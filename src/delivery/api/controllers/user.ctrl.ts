import { User } from '../../../application/definitions/entities/user';

export default class UserCtrl {
  constructor() { }

  create(req, res) {
    const business = req.container.resolve('createUserBusiness');

    return business
      .create(
      req.body.first_name,
      req.body.last_name,
      req.body.document
      )
      .then((user: User) => res.json({ status: 200, data: user }))
      .catch((err) => res.status(500).json({ status: 500, error_type: 'system', errors: err }));
  }
}
