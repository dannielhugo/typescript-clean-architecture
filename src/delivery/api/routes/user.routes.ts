export default function(router, jsonMiddleware, userSchema, userCtrl) {
  router.post('/users', jsonMiddleware(userSchema.schema), userCtrl.create);
}
