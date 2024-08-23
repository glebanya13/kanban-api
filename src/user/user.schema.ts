import { User, userRoles } from './user.model';
import { extendSchema, ModelSchema } from '@common/mongodb/base.schema';
import { HydratedDocument } from 'mongoose';

export const userDefinition: ModelSchema<User> = {
  role: {
    type: String,
    required: true,
    enum: userRoles,
  },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  refreshToken: { type: String },
};

export type UserDocument = HydratedDocument<User>;
export const UserSchema = extendSchema(userDefinition);
