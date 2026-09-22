import { MISSING_VALUE_LABEL } from '../constants/missing-value-label';

export const formatNumericValue = (value: number | null, digits = 0): string => {
  if (value === null || Number.isNaN(value)) {
    return MISSING_VALUE_LABEL;
  }

  return value.toFixed(digits);
};
