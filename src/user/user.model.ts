import { DatabaseModel } from '@common/type/model';

export const userRoles = ['admin', 'owner', 'client'] as const;

export type UserRole = (typeof userRoles)[number];

export class User extends DatabaseModel {
  role?: UserRole;
  username?: string;
  firstName: string;
  lastName: string;
  refreshToken?: string;
}
