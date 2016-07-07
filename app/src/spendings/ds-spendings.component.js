import moment, {stripTime} from '~/shared/moment';
import {reduceEntries} from './ds-personal-spendings.component';
import {ComponentController} from '~/shared/components/component.controller';

class DsSpendingsController extends ComponentController {
  /*@ngInject*/
  constructor($element) {
    super();
    this.$element = $element;
  }

  $onChanges() {
    this.state = this.getNewState();
  }

  $postLink() {
    this.flexComponent();
  }

  $onDestroy() {
    this.$element = null;
  }

  flexComponent() {
    this.$element.addClass('flex layout-column');
  }

  select(state) {
    return {
      weeks: this.weeksSelector(state),
      entries: this.entriesSelector(state),
      chart: {
        labels: Array.from(moment.localeData()._weekdays),
        data: [this.currentWeekChartDataSelector(state)]
      }
    };
  }

  weeksSelector() {
    const created = this.stats.entries.map(entry => moment(entry.created));
    const min = moment.min(created) || moment();
    const max = moment.max(created) || moment();
    const weeks = [];

    for (const cur = min.clone(); cur.isBefore(max); cur.week(cur.week() + 1)) {
      const start = cur.clone().startOf('week');
      const end = cur.clone().endOf('week');
      const amount = reduceEntries(this.stats.entries.filter(entry => moment(entry.created).isBetween(start, end, null, '[]')));

      weeks.push({start: stripTime(start), end: stripTime(end), amount});
    }

    return weeks;
  }

  currentWeekChartDataSelector() {
    const start = moment().startOf('week');
    const end = moment().endOf('week');
    const data = [];

    for (const cur = start.clone(); cur.isSameOrBefore(end, 'day'); cur.add(1, 'day')) {
      const segment = this.stats.entries
        .filter(entry => moment(entry.created).isSame(cur, 'day'))
        .reduce((a, b) => a + b.amount, 0);
      data.push(segment);
    }
    return data;
  }

  entriesSelector(state) {
    const categoryOrder = this.selectorsService.resultCategoriesSelector(state);
    const categoryEntities = this.selectorsService.categoryEntitiesSelector(state);
    const uncategorizedEntries = this.stats.entries.filter(entry => entry.categoryid === null).map(entry => ({type: 'entry', entity: entry}));
    let items = [];

    for (const categoryId of categoryOrder) {
      const entries = this.stats.entries
        .filter(entry => entry.categoryid === categoryId)
        .map(entry => ({type: 'entry', entity: entry}));
      if (entries.length) {
        items.push({type: 'category', entity: categoryEntities[categoryId]});
        items = [...items, ...entries];
      }
    }

    if (uncategorizedEntries.length > 0) {
      items.push({type: 'category', entity: {name: 'Uncategorized'}});
      items = [...items, ...uncategorizedEntries];
    }

    return items;
  }
}

export const dsSpendings = {
  require: {
    dsApp: '^^'
  },
  bindings: {
    stats: '<'
  },
  template: require('./ds-spendings.component.html'),
  controller: DsSpendingsController,
  controllerAs: 'dsSpendings'
};
