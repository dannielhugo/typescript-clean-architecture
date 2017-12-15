
export default function (
  router,
  jsonMiddleware,
  paramsMiddleware,
  schemas,
  accountCtrl
) {
  const validateParamMiddleware = paramsMiddleware({
    userId: 'number',
    accountId: 'number'
  });

  router.route('/users/:userId/accounts')
    .get(
    validateParamMiddleware,
    accountCtrl.list
    )
    .post(
    validateParamMiddleware,
    jsonMiddleware(schemas.accountSchema.schema),
    accountCtrl.create
    );

  router.route('/users/:userId/accounts/:accountId/balance')
    .put(
    validateParamMiddleware,
    jsonMiddleware(schemas.addBalanceSchema.schema),
    accountCtrl.addBalance
    );
}
