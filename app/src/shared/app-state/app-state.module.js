import * as actionsService from './actions.service';
import * as apiActionsService from './api-actions.service';
import * as reducersService from './reducers.service';
import * as reduxMiddlewareService from './redux-middleware.service';
import * as selectorsService from './selectors.service';
import * as storeService from './store.service';
import * as storeUtilService from './store-util.service';

const AppState = angular
  .module('appState', [])
  .factory('actionsService', () => actionsService)
  .factory('apiActionsService', () => apiActionsService)
  .factory('reducersService', () => reducersService)
  .factory('reduxMiddlewareService', () => reduxMiddlewareService)
  .factory('selectorsService', () => selectorsService)
  .factory('storeService', () => storeService.store)
  .factory('storeUtilService', () => storeUtilService)
  .name
  ;

export default AppState;
