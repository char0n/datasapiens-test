import {values} from 'lodash';
import {createSelector} from 'reselect';

import moment from '~/shared/moment';
import {currentUserIdSelector, entryEntitiesSelector} from '~/shared/app-state/selectors.service';
import {ComponentController} from '~/shared/components/component.controller';

class DsPersonalSpendingsController extends ComponentController {
  /*@ngInject*/
  constructor($scope, $element) {
    super();
    this.$scope = $scope;
    this.$element = $element;
  }

  $onInit() {
    this.dsApp.getToolbar().changeTitle('Personal spendings');
    this.storeSubscribe();
  }

  $postLink() {
    this.flexComponent();
  }

  $onDestroy() {
    this.storeUnsubscribe();
    this.$scope = null;
    this.$element = null;
  }

  flexComponent() {
    this.$element.addClass('flex layout-column');
  }

  getInitialState() {
    return this.getNewState();
  }

  select(state) {
    return {
      entries: this.currentUserEntriesSelector(state),
      total: this.totalSelector(state),
      today: this.todaySelector(state),
      week: this.weekSelector(state),
      month: this.monthSelector(state)
    };
  }
}
DsPersonalSpendingsController.prototype.currentUserEntriesSelector = createSelector(
  [currentUserIdSelector, entryEntitiesSelector],
  (currentUserId, entriesEntities) => values(entriesEntities).filter(entry => entry.userid === currentUserId)
);
DsPersonalSpendingsController.prototype.totalSelector = createSelector(
  [DsPersonalSpendingsController.prototype.currentUserEntriesSelector],
  currentEntries => reduceEntries(currentEntries)
);
DsPersonalSpendingsController.prototype.todaySelector = createSelector(
  [DsPersonalSpendingsController.prototype.currentUserEntriesSelector],
  currentEntries => {
    const today = moment();
    const todayEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'day'));

    return reduceEntries(todayEntries);
  }
);
DsPersonalSpendingsController.prototype.weekSelector = createSelector(
  [DsPersonalSpendingsController.prototype.currentUserEntriesSelector],
  currentEntries => {
    const today = moment();
    const weekEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'week'));

    return reduceEntries(weekEntries);
  }
);
DsPersonalSpendingsController.prototype.monthSelector = createSelector(
  [DsPersonalSpendingsController.prototype.currentUserEntriesSelector],
  currentEntries => {
    const today = moment();
    const monthEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'month'));

    return reduceEntries(monthEntries);
  }
);

export function reduceEntries(entries) {
  return entries.reduce((total, currentEntry) => {
    return total + currentEntry.amount;
  }, 0);
}

export const dsPersonalSpendings = {
  require: {
    dsApp: '^^'
  },
  template: require('./ds-personal-spendings.component.html'),
  controller: DsPersonalSpendingsController,
  controllerAs: 'dsPersonalSpendings'
};
