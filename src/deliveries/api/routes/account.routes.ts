
export default function (router, jsonMiddleware, paramsMiddleware, accountSchema, accountCtrl) {
  const validateParamMiddleware = paramsMiddleware({
    userId: 'number'
  });

  router.route('/users/:userId/accounts')
    .get(
    validateParamMiddleware,
    accountCtrl.list
    )
    .post(
    validateParamMiddleware,
    jsonMiddleware(accountSchema.schema),
    accountCtrl.create
    );
}
