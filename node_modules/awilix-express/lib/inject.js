/**
 * Express middleware factory that will inject given dependencies on request object
 *
 * @param  {...*} dependencies
 * @return {Function}
 */
module.exports = function inject(...dependencies) {
  return function injectMiddleware(req, res, next) {
    dependencies.reduce(injectDependency, req);

    return next();
  };
};

function injectDependency(req, dependency) {
  req[dependency] = req.container.resolve(dependency);

  return req;
}
