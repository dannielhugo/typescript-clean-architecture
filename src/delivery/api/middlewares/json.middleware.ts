import * as ajv from 'ajv';

const validate = (schema) => {
  // We will compile the schema here because it will only need to compile once
  let validate = ajv({ removeAdditional: true }).compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);

    if(!valid) {
      return res.status(500).json({
        status: 500,
        error_type: 'validation',
        error: validate.errors
      })
    }

    next();
  }
}


export default function jsonMiddleware() {
  return validate;
}
