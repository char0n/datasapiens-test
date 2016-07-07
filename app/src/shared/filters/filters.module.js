import {numberClampFilter} from './number-clamp.filter';
import {mdDatetimeFilter} from './md-datetime.filter';

const Filters = angular
  .module('filters', [])
  .filter('numberClamp', () => numberClampFilter)
  .filter('mdDatetime', () => mdDatetimeFilter)
  .name
  ;

export default Filters;
