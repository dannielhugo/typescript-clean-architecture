

export default function jsonMiddleware(ajv) {
  return (schema) => {

    // We will compile the schema here because it will only need to compile once
    const validate = ajv({ removeAdditional: true }).compile(schema);

    return (req, res, next) => {
      const valid = validate(req.body);

      if (!valid) {
        return res.status(500).json({
          status: 500,
          error_type: 'validation',
          error: validate.errors
        });
      }

      next();
    };
  };
}
