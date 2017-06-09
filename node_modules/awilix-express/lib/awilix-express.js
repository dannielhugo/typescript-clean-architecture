const invokers = require('./invokers');

module.exports = {
  scopePerRequest: require('./scopePerRequest'),
  inject: require('./inject'),
  makeInvoker: invokers.makeInvoker,
  makeClassInvoker: invokers.makeClassInvoker
};
