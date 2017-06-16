import { JsonSchema } from './json.schema';

export const schema: JsonSchema = {
    title: 'Account',
    type: 'object',
    additionalProperties: false,
    properties: {
      owner: {
        type: 'string'
      },
      balance: {
        description: 'Account current balance',
        type: 'integer',
        minimum: 0
      }
    },
    required: ['owner', 'balance']
  };
