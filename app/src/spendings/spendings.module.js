import {dsSpendings} from './ds-spendings.component';
import {dsPersonalSpendings} from './ds-personal-spendings.component';
import {dsFamilySpendings} from './ds-family-spendings.component';

const Spendings = angular
  .module('app.spendings', [])
  .component('dsSpendings', dsSpendings)
  .component('dsPersonalSpendings', dsPersonalSpendings)
  .component('dsFamilySpendings', dsFamilySpendings)
  .name
;

export default Spendings;
