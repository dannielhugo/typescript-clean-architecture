import { User } from '../../../application/entities/types/user';

export default class UserCtrl {
  constructor() { }

  async create(req, res) {
    const business = req.container.resolve('createUserBusiness');

    try {
      const user: User = await business
        .execute(
        req.body.first_name,
        req.body.last_name,
        req.body.document
        );

      res.json({ status: 200, data: user });
    } catch (error) {
      res.status(500).json({ status: 500, error_type: 'system', errors: error });
    }
  }
}
