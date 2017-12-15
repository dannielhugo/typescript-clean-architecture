import { JsonSchema } from './json.schema';

export const schema: JsonSchema = {
  title: 'AddBalance',
  type: 'object',
  additionalProperties: false,
  properties: {
    amount: {
      description: 'Account current amount',
      type: 'integer',
      minimum: 1
    }
  },
  required: ['amount']
};
