import { makeClassInvoker } from 'awilix-express';

export default function(router, jsonMiddleware, accountSchema, accountCtrl) {
  const api = makeClassInvoker(accountCtrl);

  router.route('/user/:userId/accounts')
    .get(api('list'))
    .post(jsonMiddleware(accountSchema.schema), api('create'));
}
