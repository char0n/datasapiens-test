import {assert} from 'chai';
import moment from '~/shared/moment';

import {mdDatetimeFilterFactory} from './md-datetime.filter';

describe('mdDatetimeFilter', () => {
  it('should format time in same day', () => {
    const isoDatetime = '2016-04-08T17:00:00+02:00';
    const currentDatetime = moment('2016-04-08T18:00:00+02:00');
    const storeStub = {getState: sinon.stub().returns({timezone: 'Europe/London'})};
    const currentUserSelectorStub = sinon.stub().returns(storeStub.getState());
    const formattedDatetime = mdDatetimeFilterFactory(isoDatetime, currentDatetime, currentUserSelectorStub, storeStub);

    assert.strictEqual(formattedDatetime, '4:00 PM');
  });

  it('should format date in same year', () => {
    const isoDatetime = '2016-03-08T17:00:00+02:00';
    const currentDatetime = moment('2016-04-08T18:00:00+02:00');
    const storeStub = {getState: sinon.stub().returns({timezone: 'Europe/Prague'})};
    const currentUserSelectorStub = sinon.stub().returns(storeStub.getState());
    const formattedDatetime = mdDatetimeFilterFactory(isoDatetime, currentDatetime, currentUserSelectorStub, storeStub);

    assert.strictEqual(formattedDatetime, 'Mar 8');
  });

  it('should format date', () => {
    const isoDatetime = '2015-03-08T17:00:00+02:00';
    const currentDatetime = moment('2016-04-08T18:00:00+02:00');
    const storeStub = {getState: sinon.stub().returns({timezone: 'Europe/Prague'})};
    const currentUserSelectorStub = sinon.stub().returns(storeStub.getState());
    const formattedDatetime = mdDatetimeFilterFactory(isoDatetime, currentDatetime, currentUserSelectorStub, storeStub);

    assert.strictEqual(formattedDatetime, '3/8/2015');
  });
});
