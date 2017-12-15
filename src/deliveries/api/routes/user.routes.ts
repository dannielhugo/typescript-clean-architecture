export default function (
  router,
  jsonMiddleware,
  schemas,
  userCtrl
) {
  router.post('/users', jsonMiddleware(schemas.userSchema.schema), userCtrl.create);
}
