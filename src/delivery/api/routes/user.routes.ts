import { makeClassInvoker } from 'awilix-express';

export default function(router, jsonMiddleware, userSchema) {
  const api = req.container.resolve('userCtrl');
  router.post('/users', jsonMiddleware(userSchema.schema), api.create);
}
