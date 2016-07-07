import moment, {mdDatetimeFormat} from '~/shared/moment';

/**
 * Format datetime represented as datetime ISO string according to material design rules.
 * Should be used in md-list-items only for now.
 * @param {string} isoDatetime
 * @param {?moment} currentDatetime
 * @returns {string} formatted datetime
 */
export function mdDatetimeFilter(isoDatetime, currentDatetime = null) {
  const datetime = moment(isoDatetime);
  const validCurrentDatetime = currentDatetime || moment();

  return mdDatetimeFormat(datetime, validCurrentDatetime);
}

