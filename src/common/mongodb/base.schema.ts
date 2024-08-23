import { DatabaseModel } from '@common/type/model';
import { Schema, SchemaDefinitionProperty } from 'mongoose';

export type ModelSchema<T> = Record<
  keyof Omit<T, 'id'>,
  SchemaDefinitionProperty
>;

export const BaseSchema = new Schema(
  {},
  {
    toJSON: {
      virtuals: true,
      transform: (document, result) => {
        result.id = document.id;
        delete result._t;
        delete result.__v;
        delete result._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (document, result) => {
        result.id = document.id;
        delete result._t;
        delete result.__v;
        delete result._id;
      },
    },
  },
);

export function extendSchema<T extends DatabaseModel>(
  definition: ModelSchema<T>,
  options?: any,
  baseSchema: any = BaseSchema,
) {
  return new Schema(
    { ...baseSchema.obj, ...definition },
    { ...baseSchema.options, ...options },
  );
}
