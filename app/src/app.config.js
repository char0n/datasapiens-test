import {store} from './shared/app-state/store.service';
import {state as stateApiActions} from './shared/app-state/api-actions.service';
import moment from './shared/moment';
import {
  emitter as eventEmitter,
  HTTP_RESPONSE, HTTP_RESPONSE_ERROR,
  STORE_DISPATCH
} from './shared/event-emitter';

export function configureMoment() {
  moment.locale('en-gb');
  moment.updateLocale(moment.locale(), {
    longDateFormat: {
      L: moment.localeData().longDateFormat('L').replace('YYYY', 'YY'),
      l: moment.localeData().longDateFormat('l').replace('YYYY', 'YY')
    }
  });
}

export function configureAngularDigest($rootScope) {
  'ngInject';

  const $runDigest = () => {
    if (!$rootScope.$$phase) { $rootScope.$digest(); }
  };

  eventEmitter.on(HTTP_RESPONSE, () => $runDigest);
  eventEmitter.on(HTTP_RESPONSE_ERROR, () => $runDigest);
  eventEmitter.on(STORE_DISPATCH, () => $runDigest);
}

export function configureCompileProvider($compileProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
}

export function loadApplicationData($timeout) {
  'ngInject';

  $timeout(() => store.dispatch(stateApiActions.load()));
}
