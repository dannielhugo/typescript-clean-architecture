
export default function (
  router,
  jsonMiddleware,
  paramsMiddleware,
  accountSchema,
  addBalanceSchema,
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
    jsonMiddleware(accountSchema.schema),
    accountCtrl.create
    );

  router.route('/users/:userId/accounts/:accountId/balance')
    .put(
    validateParamMiddleware,
    jsonMiddleware(addBalanceSchema.schema),
    accountCtrl.addBalance
    );
}
