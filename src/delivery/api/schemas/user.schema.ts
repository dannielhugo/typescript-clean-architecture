import { JsonSchema } from './json.schema';

export const schema: JsonSchema = {
  title: 'User',
  type: 'object',
  additionalProperties: false,
  properties: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string',
    },
    document: {
      type: 'string',
    }
  },
  required: ['first_name', 'last_name', 'document']
};
