import {assert} from 'chai';

import {numberClampFilter, defaultLower, defaultUpper} from './number-clamp.filter';

describe('numberClampFilter', () => {
  const defaultLowerString = String(defaultLower);
  const defaultUpperString = String(defaultUpper) + '+';

  it('should return String(0) if number < 0', () => {
    assert.strictEqual(numberClampFilter(-1), defaultLowerString);
  });

  it('should return lower if number < lower', () => {
    assert.strictEqual(numberClampFilter(0, 1), '1');
  });

  it('should return lower if number equals lower', () => {
    assert.strictEqual(numberClampFilter(1, 1), '1');
  });

  it('should return String representation of number when in boundaries', () => {
    assert.strictEqual(numberClampFilter(0), '0');
    assert.strictEqual(numberClampFilter(444), '444');
    assert.strictEqual(numberClampFilter(999), '999');
  });

  it('should return clamped number in default boundaries', () => {
    assert.strictEqual(numberClampFilter(1000), defaultUpperString);
  });

  it('should return clamped number for defined boundaries', () => {
    assert.strictEqual(numberClampFilter(51, 0, 50), '50+');
  });

  it('should return empty string if number is not a number', () => {
    assert.strictEqual(numberClampFilter(null), '');
    assert.strictEqual(numberClampFilter(Infinity), '');
    assert.strictEqual(numberClampFilter(-Infinity), '');
    assert.strictEqual(numberClampFilter(NaN), '');
    assert.strictEqual(numberClampFilter(undefined), '');
    assert.strictEqual(numberClampFilter(new Date()), '');
  });

  it('should use defaultLower if lower is not a number', () => {
    assert.strictEqual(numberClampFilter(1, null, defaultUpper), '1');
    assert.strictEqual(numberClampFilter(1, Infinity, defaultUpper), '1');
    assert.strictEqual(numberClampFilter(1, -Infinity, defaultUpper), '1');
    assert.strictEqual(numberClampFilter(1, NaN, defaultUpper), '1');
    assert.strictEqual(numberClampFilter(1, undefined, defaultUpper), '1');
    assert.strictEqual(numberClampFilter(1, new Date(), defaultUpper), '1');
  });

  it('should use defaultUpper if upper is not a number', () => {
    assert.strictEqual(numberClampFilter(1, defaultLower, null), '1');
    assert.strictEqual(numberClampFilter(1, defaultLower, Infinity), '1');
    assert.strictEqual(numberClampFilter(1, defaultLower, -Infinity), '1');
    assert.strictEqual(numberClampFilter(1, defaultLower, NaN), '1');
    assert.strictEqual(numberClampFilter(1, defaultLower, undefined), '1');
    assert.strictEqual(numberClampFilter(1, defaultLower, new Date()), '1');
  });
});
