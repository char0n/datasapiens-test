import {isFunction, noop} from 'lodash';
import {bindActionCreators} from 'redux';

import {store as storeService} from '~/shared/app-state/store.service';
import * as selectorsService from '~/shared/app-state/selectors.service';

export class ComponentController {
  constructor() {
    this.storeService = storeService;
    this.selectorsService = selectorsService;
    this.state = this.getInitialState();
    this.unsubscribeCallback = noop;
    this.$scope = null;
  }

  storeSubscribe() {
    this.unsubscribeCallback = this.storeService.subscribe(() => {
      this.setState(this.getNewState());
      if (this.$scope !== null) { this.$scope.$apply(); }
    });
  }

  storeUnsubscribe() {
    this.unsubscribeCallback();
    this.unsubscribeCallback = noop;
  }

  select(state) {
    return state;
  }

  getNewState() {
    return this.select(this.storeService.getState());
  }

  getInitialState() {
    return undefined;
  }

  setState(state) {
    this.state = isFunction(state) ? state(this.state, this) : state;
  }

  bindActionCreators(actionCreators) {
    return bindActionCreators(actionCreators, this.storeService.dispatch);
  }
}
