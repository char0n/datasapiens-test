import {createHash} from 'crypto';

const $$hashKeyDeleter = {$$hashKey: undefined};

/**
 * This is special version of Object.assign. It does exactly what Object.assign
 * does, but also sets $$hashKey property to undefined.
 *
 * @returns {Object}
 */
export function assign(...targets) {
  return Object.assign(...targets, $$hashKeyDeleter);
}

export function MD5(...tokens) {
  return createHash('md5').update(tokens.join()).digest('hex');
}
