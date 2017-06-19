export default function(router, jsonMiddleware, accountSchema, accountCtrl) {
  router.route('/user/:userId/accounts')
    .get(accountCtrl.list)
    .post(jsonMiddleware(accountSchema.schema), accountCtrl.create);
}
