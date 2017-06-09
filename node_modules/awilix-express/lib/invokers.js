exports.makeInvoker = makeInvoker;
exports.makeClassInvoker = makeClassInvoker;

/**
 * Returns a function that when called with a name,
 * returns another function to be used as Express middleware.
 * That function will run `fn` with the container cradle as the
 * only parameter, and then call the `methodToInvoke` on
 * the result.
 *
 * @param {Function} fn
 * @return {(methodToInvoke: string) => (req) => void}
 */
function makeInvoker(fn) {
  /**
   * 2nd step is to create a method to invoke on the result
   * of the function.
   *
   * @param  {string} methodToInvoke
   * @return {(req) => void}
   */
  return function makeMemberInvoker(methodToInvoke) {
    /**
     * The invoker middleware.
     *
     * @param  {Express.Request} req
     * @param  {...*} rest
     * @return {*}
     */
    return function memberInvoker(req, ...rest) {
      const result = fn(req.container.cradle);
      return result[methodToInvoke](req, ...rest);
    };
  };
}

/**
 * Same as `makeInvoker` but for classes.
 *
 * @param  {Class} Class
 * @return {(methodToInvoke: string) => (req) => void}
 */
function makeClassInvoker(Class) {
  return makeInvoker((cradle) => new Class(cradle));
}
