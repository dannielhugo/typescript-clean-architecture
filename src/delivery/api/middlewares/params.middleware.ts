import * as debug from 'debug';
import * as _ from 'lodash';
export default function paramsMiddleware() {
  return (coercion) => {
    return (req, res, next) => {
      _.map(req.params, (param: any, index: string) => {
        if (coercion[index]) {
          switch (coercion[index]) {
            case 'number':
              req.params[index] = parseInt(param);
              break;
            case 'boolean':
              req.params[index] = !!param;
              break;
            default:
              break;
          }
        }
      });
      debug('app:middleware')(JSON.stringify(req.params));
      next();
    };
  };
}
