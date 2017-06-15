export default function(router, jsonMiddleware, accountSchema, accountCtrl) {
  router.get('/accounts', accountCtrl.list);
  router.post('/accounts', jsonMiddleware(accountSchema.schema), accountCtrl.create);
}
