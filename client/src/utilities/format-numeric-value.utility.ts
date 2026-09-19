import { NUMERIC_PLACEHOLDER } from '../constants/numeric-placeholder.constant';

export const formatNumericValue = (value: number | null, digits = 0): string => {
  if (value === null || Number.isNaN(value)) {
    return NUMERIC_PLACEHOLDER;
  }

  return value.toFixed(digits);
};
