
/**
 * Error message list
 */
export enum ERROR_MESSAGE {
  'server_error' = 'An internal server error occurred',
  'user_exists' = 'An user with supplied document already exists',
  'user_not_found' = 'The user \':id\' was not found',
  'max_accounts_reached' = 'Cannot create more accounts for this user'
}