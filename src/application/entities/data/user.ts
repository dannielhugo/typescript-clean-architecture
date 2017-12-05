export interface User {
    id: number;
    firstName: string;
    lastName: string;
    document: string;
}

export const USER = {
  DUPLICATED_USER_ERROR: 'user_exists',
  MISSING_USER_ERROR: 'user_does_not_exists'
};
