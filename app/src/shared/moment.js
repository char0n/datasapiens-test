import {isObject, flow, partialRight} from 'lodash';

const moment = window.moment = require('moment');
require('moment-timezone/builds/moment-timezone-with-data');
export default moment;

// stripZoneAndTime :: moment -> moment
export const stripZoneAndTime = flow(stripZone, stripTime);
// isDatetimeWithingWeek :: (moment, moment) -> boolean
export const isDatetimeWithinWeek = partialRight(isDatetimeWithin, moment.duration(1, 'week'));
// isDatetimeWithingMonth :: (moment, moment) -> boolean
export const isDatetimeWithinMonth = partialRight(isDatetimeWithin, moment.duration(1, 'month'));
// isSameDay :: (moment, moment) -> boolean
export const isSameDay = partialRight(isSame, 'day');
// isSameYear :: (moment, moment) -> boolean
export const isSameYear = partialRight(isSame, 'year');

/**
 * Adds time to moment object with stripped time.
 * @param {moment} datetime
 * @param {number|moment.duration} duration
 * @returns {moment} time decorated moment
 */
export function addTime(datetime, duration = 0) {
  const momentDuration = isObject(duration) ? duration : moment.duration(duration, 'seconds');
  const timeDecoratedMoment = moment(datetime).add(momentDuration);

  return angular.element.fullCalendar.moment(timeDecoratedMoment);
}

/**
 * Checks if moment object is decorated with time.
 * @param {moment} datetime
 * @returns {boolean}
 */
export function hasTime(datetime) {
  return angular.element.fullCalendar.moment(datetime).hasTime();
}

/**
 * Strips time from moment object.
 * @param {moment} datetime
 * @returns {moment} time stripped moment
 */
export function stripTime(datetime) {
  return angular.element.fullCalendar.moment(datetime).stripTime();
}

/**
 * Strips timezone information from moment object.
 * @param {moment} datetime
 * @returns {moment} timezone stripped moment
 */
export function stripZone(datetime) {
  return angular.element.fullCalendar.moment(datetime).stripZone();
}

/**
 * Sets or gets time.
 * @param {moment} datetime
 * @param {?moment.duration} duration
 * @returns {moment|moment.duration}
 */
export function time(datetime, duration = undefined) {
  return angular.element.fullCalendar.moment(datetime).time(duration);
}

/**
 * Checks if datetime is within specified boundary.
 * @param {moment} datetime
 * @param {moment} compareDatetime
 * @param {moment.duration} duration
 * @returns {boolean}
 */
export function isDatetimeWithin(datetime, compareDatetime, duration) {
  const lowerBoundary = compareDatetime.clone().subtract(duration);
  const upperBoundary = compareDatetime.clone().add(duration);

  return datetime.isBetween(lowerBoundary, upperBoundary, null, '[]');
}

/**
 * Check if datetime is from the past.
 * @param {moment} datetime
 * @param {moment} currentDatetime
 * @returns {boolean}
 */
export function isPast(datetime, currentDatetime) {
  return datetime.isBefore(currentDatetime);
}

/**
 * Check if datetime is from the future.
 * @param {moment} datetime
 * @param {moment} currentDatetime
 * @returns {boolean}
 */
export function isFuture(datetime, currentDatetime) {
  return datetime.isAfter(currentDatetime);
}

/**
 * Check if datetime is from past that can be considered distant past.
 * @param {moment} datetime
 * @param {moment} currentDatetime
 * @returns {boolean}
 */
export function isDistantPast(datetime, currentDatetime) {
  return isPast(datetime, currentDatetime) && !isDatetimeWithinMonth(datetime, currentDatetime);
}

/**
 * Check if datetime is same.
 * @param {moment} datetime
 * @param {moment} currentDatetime
 * @param {?string} unit
 * @returns {boolean}
 */
export function isSame(datetime, currentDatetime, unit = null) {
  const wrappedDatetime = angular.element.fullCalendar.moment(datetime);
  const wrappedCurrentDatetime = angular.element.fullCalendar.moment(currentDatetime);

  return wrappedDatetime.isSame(wrappedCurrentDatetime, unit);
}

/**
 * Format datetime according to material design rules.
 * @param {moment} datetime
 * @param {moment} currentDatetime
 * @returns {string}
 */
export function mdDatetimeFormat(datetime, currentDatetime) {
  if (isSameDay(datetime, currentDatetime)) {
    return datetime.format('LT');
  } else if (isSameYear(datetime, currentDatetime) && isFuture(datetime, currentDatetime)) {
    return datetime.format('MMM D, LT');
  } else if (isSameYear(datetime, currentDatetime) && isPast(datetime, currentDatetime)) {
    return datetime.format('MMM D');
  }
  return datetime.format('l');
}

/**
 * Replace timezone, but preserve date and time.
 * @param {moment} datetime
 * @param {string} timezone
 * @returns {moment}
 */
export function replaceTimezone(datetime, timezone = 'UTC') {
  const zoneLess = stripZone(datetime).format();
  const utcOffset = datetime.clone().tz(timezone).format('Z');
  const zoned = `${zoneLess}${utcOffset}`;

  return moment.parseZone(zoned);
}

/**
 * Combine date and time into one moment.
 * @param {Date|moment} date
 * @param {Date|moment} time
 * @returns {moment}
 */
export function combineDateAndTime(date, time) {
  const mDate = angular.element.fullCalendar.moment(moment.parseZone(date));
  const mTime = angular.element.fullCalendar.moment(moment.parseZone(time));

  return mDate.time(mTime.time());
}

/**
 * Format datetime according to material design rules.
 * @param {moment} startDate
 * @param {moment} endDate
 * @param {string} [dateFormat='ddd, D MMM']
 * @param {string} [timeFormat='LT']
 * @returns {string}
 */
export function formatDates(startDate, endDate, dateFormat = 'ddd, D MMMM', timeFormat = 'LT') {
  if (!hasTime(startDate) && isSame(startDate, endDate, 'day')) {
    return startDate.format(dateFormat);
  } else if (!hasTime(startDate) && !isSame(startDate, endDate, 'day')) {
    return `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`;
  } else if (hasTime(startDate) && isSame(startDate, endDate, 'day')) {
    return startDate.format(`${dateFormat}, ${timeFormat}`) + ' - ' + endDate.format(timeFormat);
  }
  return startDate.format(`${dateFormat}, ${timeFormat}`) + ' - ' + endDate.format(`${dateFormat}, ${timeFormat}`);
}
