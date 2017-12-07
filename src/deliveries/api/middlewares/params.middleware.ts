export default function paramsMiddleware(utilPlugin, debug) {
  return (coercion) => {
    return (req, res, next) => {
      utilPlugin._map(req.params, (param: any, index: string) => {
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

      next();
    };
  };
}
