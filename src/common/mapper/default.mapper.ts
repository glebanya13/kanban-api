import { DateRangeRequiredDTO } from '@common/dto/date-range-required.dto';
import { DateRangeDTO } from '@common/dto/date-range.dto';
import { NumberRangeRequiredDTO } from '@common/dto/number-range-required.dto';
import { NumberRangeDTO } from '@common/dto/number-range.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { MongoDateRangeInput } from '@common/repository/input/mongo/mongo-date-ranger.input';
import {
  MongoBooleanEqualsInput,
  MongoNumberEqualsInput,
  MongoStringEqualsInput,
} from '@common/repository/input/mongo/mongo-equals.input';
import { MongoNumberRangeInput } from '@common/repository/input/mongo/mongo-number-range.input';
import { MongoNumberTermsEqualsInput } from '@common/repository/input/mongo/mongo-number-terms.input';
import { MongoStringTermsEqualsInput } from '@common/repository/input/mongo/mongo-string-terms.input';
import { PaginationInput } from '@common/repository/input/pagination.input';

export class DefaultMapper {
  static getPaginationInput(value: PaginationDto): PaginationInput {
    if (!value) return {};

    const { limit = 10, offset: skip = 0 } = value;

    return { skip, limit };
  }

  static getNumberRange(value: NumberRangeDTO): NumberRangeRequiredDTO {
    const { from, to } = value;
    return !from && !to ? undefined : { from, to };
  }

  static getDateRange(value: DateRangeDTO): DateRangeRequiredDTO {
    const { from, to } = value;
    return !from && !to ? undefined : { from, to };
  }

  static getNumberRangeInput(value: NumberRangeDTO): MongoNumberRangeInput {
    if (!value?.from && !value?.to) {
      return undefined;
    }

    const result: MongoNumberRangeInput = {};

    if (value?.from) {
      result.$gte = value.from;
    }

    if (value?.to) {
      result.$lte = value.to;
    }

    return result;
  }

  static getDateRangeInput(value: DateRangeDTO): MongoDateRangeInput {
    if (!value?.from && !value?.to) {
      return undefined;
    }

    const result: MongoDateRangeInput = {};

    if (value?.from) {
      result.$gte = value.from;
    }

    if (value?.to) {
      result.$lte = value.to;
    }

    return result;
  }

  static getNumberTermsEqualsInput(
    value: number[],
  ): MongoNumberTermsEqualsInput {
    if (value && Array.isArray(value)) {
      return { $in: [...value] };
    }

    return undefined;
  }

  static getStringTermsEquals(value: string[]): MongoStringTermsEqualsInput {
    if (value && Array.isArray(value)) {
      return { $in: [...value] };
    }

    return undefined;
  }

  static getStringEqualsInput(
    value: string,
    equals: boolean = true,
  ): MongoStringEqualsInput {
    if (!value) return undefined;
    return equals ? { $eq: value } : { $ne: value };
  }

  static getNumberEqualsInput(
    value: number,
    equals: boolean = true,
  ): MongoNumberEqualsInput {
    if (!value) return undefined;
    return equals ? { $eq: value } : { $ne: value };
  }

  static getBooleanEqualsInput(
    value: boolean,
    equals: boolean = true,
  ): MongoBooleanEqualsInput {
    if (!value) return undefined;
    return equals ? { $eq: value } : { $ne: value };
  }
}
