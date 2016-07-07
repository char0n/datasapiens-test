import {values} from 'lodash';
import {createSelector} from 'reselect';

import moment from '~/shared/moment';
import {ComponentController} from '~/shared/components/component.controller';
import {reduceEntries} from './ds-personal-spendings.component';
import {currentUserSelector, entryEntitiesSelector, userEntitiesSelector} from '~/shared/app-state/selectors.service';

class DsFamilySpendingsController extends ComponentController {
  /*@ngInject*/
  constructor($scope, $element) {
    super();
    this.$scope = $scope;
    this.$element = $element;
  }

  $onInit() {
    this.dsApp.getToolbar().changeTitle('Family spendings');
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
      entries: this.currentFamilyEntriesSelector(state),
      total: this.totalSelector(state),
      today: this.todaySelector(state),
      week: this.weekSelector(state),
      month: this.monthSelector(state)
    };
  }
}
DsFamilySpendingsController.prototype.currentFamilyEntriesSelector = createSelector(
  [currentUserSelector, entryEntitiesSelector, userEntitiesSelector],
  (currentUser, entriesEntities, userEntities) => {
    return values(entriesEntities).filter(entry => {
      const user = userEntities[entry.userid];

      return user.lastname === currentUser.lastname;
    });
  }
);
DsFamilySpendingsController.prototype.totalSelector = createSelector(
  [DsFamilySpendingsController.prototype.currentFamilyEntriesSelector],
  currentEntries => reduceEntries(currentEntries)
);
DsFamilySpendingsController.prototype.todaySelector = createSelector(
  [DsFamilySpendingsController.prototype.currentFamilyEntriesSelector],
  currentEntries => {
    const today = moment();
    const todayEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'day'));

    return reduceEntries(todayEntries);
  }
);
DsFamilySpendingsController.prototype.weekSelector = createSelector(
  [DsFamilySpendingsController.prototype.currentFamilyEntriesSelector],
  currentEntries => {
    const today = moment();
    const weekEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'week'));

    return reduceEntries(weekEntries);
  }
);
DsFamilySpendingsController.prototype.monthSelector = createSelector(
  [DsFamilySpendingsController.prototype.currentFamilyEntriesSelector],
  currentEntries => {
    const today = moment();
    const monthEntries = currentEntries.filter(entry => moment(entry.created).isSame(today, 'month'));

    return reduceEntries(monthEntries);
  }
);

export const dsFamilySpendings = {
  require: {
    dsApp: '^^'
  },
  template: require('./ds-family-spendings.component.html'),
  controller: DsFamilySpendingsController,
  controllerAs: 'dsFamilySpendings'
};
