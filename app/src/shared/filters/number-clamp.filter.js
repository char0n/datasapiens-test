import {clamp, partial} from 'lodash';

const numberFilter = angular.injector(['ng']).get('numberFilter');
const _ = partial.placeholder;
export const defaultLower = 0;
export const defaultUpper = 999;
export const numberClampFilter = partial(numberClampFilterFactory, _, _, _, numberFilter);

export function numberClampFilterFactory(number, lower = defaultLower, upper = defaultUpper, numberFilter) {
  const parsedNumber = parseInt(number, 10);
  const parsedLower = parseInt(lower, 10) || defaultLower;
  const parsedUpper = parseInt(upper, 10) || defaultUpper;

  if (!Number.isFinite(parsedNumber)) { return ''; }

  const validNumber = parsedNumber < parsedLower ? parsedLower : parsedNumber;
  const clampedNumber = clamp(validNumber, parsedLower, parsedUpper);
  const isClamped = clampedNumber !== validNumber;
  const formattedNumber = numberFilter(clampedNumber);

  return isClamped ? `${formattedNumber}+` : formattedNumber;
}
