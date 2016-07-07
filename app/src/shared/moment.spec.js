import {assert} from "chai";
import moment, {
  addTime,
  hasTime,
  stripTime,
  stripZone,
  time,
  isDatetimeWithin,
  isPast,
  isFuture,
  isDistantPast,
  isSame,
  mdDatetimeFormat,
  replaceTimezone,
  formatDates,
  combineDateAndTime
} from "./moment";

describe('moment', () => {
  describe('addTime', () => {
    it('should return time decorated moment', () => {
      const momentObj = stripTime(moment.parseZone('2016-04-08T00:00:00Z'));
      const duration = moment.duration(1, 'minutes');
      const timeDecoratedMoment = addTime(momentObj, duration);

      assert.strictEqual(timeDecoratedMoment.format(), '2016-04-08T00:01:00Z');
    });

    it('should return time decorated moment', () => {
      const momentObj = moment.parseZone('2016-04-08T00:00:00Z');
      const duration = 60;
      const timeDecoratedMoment = addTime(momentObj, duration).utc();

      assert.strictEqual(timeDecoratedMoment.format(), '2016-04-08T00:01:00Z');
    });

    it('should return time decorated moment', () => {
      const momentObj = stripTime(moment.parseZone('2016-04-08T00:00:00Z'));
      const timeDecoratedMoment = addTime(momentObj);

      assert.strictEqual(timeDecoratedMoment.format(), '2016-04-08T00:00:00Z');
    });

    it('should return time decorated moment', () => {
      const momentObj = moment.parseZone('2016-04-08T00:00:00Z');
      const timeDecoratedMoment = addTime(momentObj);

      assert.strictEqual(timeDecoratedMoment.format(), '2016-04-08T00:00:00Z');
    });
  });

  describe('hasTime', () => {
    it('should return true', () => {
      const dateTime = moment.parseZone('2016-04-08T01:00:00Z');

      assert.isTrue(hasTime(dateTime));
    });

    it('should return false', () => {
      const dateTime = stripTime(moment.parseZone('2016-04-08T01:00:00Z'));

      assert.isFalse(hasTime(dateTime));
    });
  });

  describe('stripTime', () => {
    it('should return time striped moment', () => {
      const dateTime = moment.parseZone('2016-04-08T01:00:00Z');
      const timeStripedMoment = stripTime(dateTime);

      assert.strictEqual(timeStripedMoment.format(), '2016-04-08');
    });

    it('should return formatted moment', () => {
      const dateTime = stripTime(moment.parseZone('2016-04-08T01:00:00Z'));
      const timeStripedMoment = stripTime(dateTime);

      assert.strictEqual(timeStripedMoment.format(), '2016-04-08');
    });
  });

  describe('stripZone', () => {
    it('should return zone striped moment', () => {
      const dateTime = moment.parseZone('2016-04-08T01:00:00Z');
      const zoneStripedMoment = stripZone(dateTime);

      assert.strictEqual(zoneStripedMoment.format(), '2016-04-08T01:00:00');
    });

    it('should return zone striped moment', () => {
      const dateTime = stripZone(moment.parseZone('2016-04-08T01:00:00Z'));
      const zoneStripedMoment = stripZone(dateTime);

      assert.strictEqual(zoneStripedMoment.format(), '2016-04-08T01:00:00');
    });
  });

  describe('time', () => {
    it('should change time', () => {
      const datetime = moment.parseZone('2016-04-08T00:00:00Z');
      const duration = moment.duration(1, 'hour');
      const timeChangedMoment = time(datetime, duration);

      assert.strictEqual(timeChangedMoment.format(), '2016-04-08T01:00:00Z');
    });

    it('should set time', () => {
      const datetime = stripTime(moment.parseZone('2016-04-08T00:00:00Z'));
      const duration = moment.duration(1, 'hour');
      const timeDecoratedMoment = time(datetime, duration);

      assert.strictEqual(timeDecoratedMoment.format(), '2016-04-08T01:00:00');
    });

    it('should get time', () => {
      const datetime = moment.parseZone('2016-04-08T01:00:00Z');
      const retrievedTime = time(datetime);

      assert.strictEqual(retrievedTime.asSeconds(), 3600);
    });
  });

  describe('isDatetimeWithin', () => {
    it('should be within the range', () => {
      const datetime = moment.parseZone('2016-04-08T15:30:00Z');
      const compareDatetime = moment.parseZone('2016-04-08T16:00:00Z');
      const duration = moment.duration(1, 'hours');

      assert.isTrue(isDatetimeWithin(datetime, compareDatetime, duration));
    });

    it('should match the lower boundary', () => {
      const datetime = moment.parseZone('2016-04-08T15:00:00Z');
      const compareDatetime = moment.parseZone('2016-04-08T16:00:00Z');
      const duration = moment.duration(1, 'hours');

      assert.isTrue(isDatetimeWithin(datetime, compareDatetime, duration));
    });

    it('should match the upper boundary', () => {
      const datetime = moment.parseZone('2016-04-08T17:00:00Z');
      const compareDatetime = moment.parseZone('2016-04-08T16:00:00Z');
      const duration = moment.duration(1, 'hours');

      assert.isTrue(isDatetimeWithin(datetime, compareDatetime, duration));
    });

    it('should be out of the range', () => {
      const datetime = moment.parseZone('2016-04-08T14:59:00Z');
      const compareDatetime = moment.parseZone('2016-04-08T16:00:00Z');
      const duration = moment.duration(1, 'hours');

      assert.isFalse(isDatetimeWithin(datetime, compareDatetime, duration));
    });

    it('should be out of the range', () => {
      const datetime = moment.parseZone('2016-04-08T17:01:00Z');
      const compareDatetime = moment.parseZone('2016-04-08T16:00:00Z');
      const duration = moment.duration(1, 'hours');

      assert.isFalse(isDatetimeWithin(datetime, compareDatetime, duration));
    });
  });

  describe('isPast', () => {
    it('should call isBefore', () => {
      const currentDatetime = moment.parseZone('2016-04-08T01:00:00Z');
      const datetimeSpy = {isBefore: sinon.spy()};

      isPast(datetimeSpy, currentDatetime);

      sinon.assert.calledOnce(datetimeSpy.isBefore);
      sinon.assert.calledWithExactly(datetimeSpy.isBefore, currentDatetime);
    });
  });

  describe('isFuture', () => {
    it('should call isAfter', () => {
      const currentDatetime = moment.parseZone('2016-04-08T01:00:00Z');
      const datetimeSpy = {isAfter: sinon.spy()};

      isFuture(datetimeSpy, currentDatetime);

      sinon.assert.calledOnce(datetimeSpy.isAfter);
      sinon.assert.calledWithExactly(datetimeSpy.isAfter, currentDatetime);
    });
  });

  describe('isDistantPast', () => {
    it('should be distant past', () => {
      const datetime = moment.parseZone('2016-03-07T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-08T00:00:00Z');

      assert.isTrue(isDistantPast(datetime, currentDatetime));
    });

    it('should not be distant past', () => {
      const datetime = moment.parseZone('2016-03-09T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-08T00:00:00Z');

      assert.isFalse(isDistantPast(datetime, currentDatetime));
    });

    it('should not be distant past', () => {
      const datetime = moment.parseZone('2016-05-09T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-08T00:00:00Z');

      assert.isFalse(isDistantPast(datetime, currentDatetime));
    });
  });

  describe('isSame', () => {
    it('should be same', () => {
      const datetime = moment.parseZone('2016-03-09T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-03-09T00:00:00Z');

      assert.isTrue(isSame(datetime, currentDatetime));
    });

    it('should be same', () => {
      const datetime = angular.element.fullCalendar.moment.parseZone('2016-03-09T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-03-09T00:00:00Z');

      assert.isTrue(isSame(datetime, currentDatetime));
    });

    it('should be same in same day', () => {
      const datetime = moment.parseZone('2016-03-09T00:00:00Z');
      const currentDatetime = stripTime('2016-03-09T01:00:00Z');
      const unit = 'day';

      assert.isTrue(isSame(datetime, currentDatetime, unit));
    });

    it('should not be same', () => {
      const datetime = moment.parseZone('2016-03-09T00:00:00Z');
      const currentDatetime = moment.parseZone('2016-03-09T01:00:00Z');

      assert.isFalse(isSame(datetime, currentDatetime));
    });
  });

  describe('mdDatetimeFormat', () => {
    it('should format time in same day', () => {
      const datetime = moment.parseZone('2016-04-08T01:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-08T02:00:00Z');

      assert.strictEqual(mdDatetimeFormat(datetime, currentDatetime), '1:00 AM');
    });

    it('should format future datetime in same year', () => {
      const datetime = moment.parseZone('2016-04-09T02:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-08T01:00:00Z');

      assert.strictEqual(mdDatetimeFormat(datetime, currentDatetime), 'Apr 9, 2:00 AM');
    });

    it('should format past datetime in same year', () => {
      const datetime = moment.parseZone('2016-04-08T01:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-09T02:00:00Z');

      assert.strictEqual(mdDatetimeFormat(datetime, currentDatetime), 'Apr 8');
    });

    it('should format datetime', () => {
      const datetime = moment.parseZone('2015-04-08T01:00:00Z');
      const currentDatetime = moment.parseZone('2016-04-09T02:00:00Z');

      assert.strictEqual(mdDatetimeFormat(datetime, currentDatetime), '4/8/2015');
    });
  });

  describe('replaceTimezone', () => {
    it('should replace timezone', () => {
      const datetime = moment.parseZone('2015-04-08T01:00:00Z');
      const timezone = 'Europe/Prague';

      const tzDecoratedMoment = replaceTimezone(datetime, timezone);

      assert.strictEqual(tzDecoratedMoment.format(), '2015-04-08T01:00:00+02:00');
    });

    it('should replace timezone', () => {
      const datetime = moment.parseZone('2015-04-08T01:00:00+02:00');
      const timezone = 'Europe/London';

      const tzDecoratedMoment = replaceTimezone(datetime, timezone);

      assert.strictEqual(tzDecoratedMoment.format(), '2015-04-08T01:00:00+01:00');
    });

    it('should replace timezone', () => {
      const datetime = moment.parseZone('2015-04-08T00:00:00+02:00');

      const tzDecoratedMoment = replaceTimezone(datetime);

      assert.strictEqual(tzDecoratedMoment.format(), '2015-04-08T00:00:00Z');
    });
  });

  describe('combineDateAndTime', () => {
    it('should combine date and time when Date objects', () => {
      const date = new Date(2015, 3, 8);
      const time = new Date(2015, 3, 8, 1, 10);
      const combinedDateAndTime = combineDateAndTime(date, time);

      assert.strictEqual(stripZone(combinedDateAndTime).format(), '2015-04-08T01:10:00');
    });

    it('should combine date and time when Date and moment objects', () => {
      const date = new Date(2015, 3, 8, 0, 0, 0);
      const time = moment.parseZone('2015-04-08T01:10:00Z');
      const combinedDateAndTime = combineDateAndTime(date, time);

      assert.strictEqual(stripZone(combinedDateAndTime).format(), '2015-04-08T01:10:00');
    });

    it('should combine date and time when Date and moment objects', () => {
      const date = moment.parseZone('2015-04-08T00:00:00Z');
      const time = new Date(2015, 3, 8, 1, 10, 0);
      const combinedDateAndTime = combineDateAndTime(date, time);

      assert.strictEqual(combinedDateAndTime.format(), '2015-04-08T01:10:00Z');
    });

    it('should combine date and time when moment objects', () => {
      const date = moment.parseZone('2015-04-08T00:00:00Z');
      const time = moment.parseZone('2015-04-08T01:10:00Z');
      const combinedDateAndTime = combineDateAndTime(date, time);

      assert.strictEqual(combinedDateAndTime.format(), '2015-04-08T01:10:00Z');
    });
  });

  describe('formatDates', () => {
    it('should format date without time in same day', () => {
      const startDate = stripTime(moment.parseZone('2015-04-08T00:00:00+02:00'));
      const endDate = moment.parseZone('2015-04-08T01:00:00+02:00');

      assert.strictEqual(formatDates(startDate, endDate), 'Wed, 8 April');
    });

    it('should format date without time', () => {
      const startDate = stripTime(moment.parseZone('2015-04-08T00:00:00+02:00'));
      const endDate = moment.parseZone('2015-04-09T01:00:00+02:00');

      assert.strictEqual(formatDates(startDate, endDate), 'Wed, 8 April - Thu, 9 April');
    });

    it('should format datetime in same day', () => {
      const startDate = moment.parseZone('2015-04-08T00:00:00+02:00');
      const endDate = moment.parseZone('2015-04-08T01:00:00+02:00');

      assert.strictEqual(formatDates(startDate, endDate), 'Wed, 8 April, 12:00 AM - 1:00 AM');
    });

    it('should format datetime', () => {
      const startDate = moment.parseZone('2015-04-08T00:00:00+02:00');
      const endDate = moment.parseZone('2015-04-09T01:00:00+02:00');

      assert.strictEqual(formatDates(startDate, endDate), 'Wed, 8 April, 12:00 AM - Thu, 9 April, 1:00 AM');
    });

    it('should format datetime', () => {
      const startDate = moment.parseZone('2015-04-08T00:00:00+02:00');
      const endDate = moment.parseZone('2015-04-09T01:00:00+02:00');
      const dateFormat = 'dddd, D MMMM YY';
      const timeFormat = 'H:mm';

      const formattedDatetime = formatDates(startDate, endDate, dateFormat, timeFormat);

      assert.strictEqual(formattedDatetime, 'Wednesday, 8 April 15, 0:00 - Thursday, 9 April 15, 1:00');
    });
  });
});
