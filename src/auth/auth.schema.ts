import { ModelSchema, extendSchema } from '@common/mongodb/base.schema';
import { HydratedDocument, Schema } from 'mongoose';
import { Auth } from './auth.model';

export const authDefinition: ModelSchema<Auth> = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
};

export type AuthDocument = HydratedDocument<Auth>;
export const AuthSchema = extendSchema(authDefinition);
