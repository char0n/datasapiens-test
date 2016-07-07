import {ComponentController} from '~/shared/components/component.controller';
import {
  emitter as eventEmitter,
  ROUTE_CHANGE_SUCCESS,
  LOCATION_CHANGE_SUCCESS
} from '~/shared/event-emitter';

/**
 * Warning: injecting $rootRouter into $routerRootComponent ends up with $rootScope.$digest errors.
 * Avoid doing that unless really necessary.
 */
export class AppController extends ComponentController {
  /*@ngInject*/
  constructor($scope, $element) {
    super();
    this.$scope = $scope;
    this.$element = $element;
    this.eventEmitter = eventEmitter;
  }

  $onInit() {
    this.storeSubscribe();
    this.$scope.$on(
      '$routeChangeSuccess',
      event => this.eventEmitter.emit(ROUTE_CHANGE_SUCCESS, event)
    );
    this.$scope.$on(
      '$locationChangeSuccess',
      (event, ...args) => this.eventEmitter.emit(LOCATION_CHANGE_SUCCESS, event, ...args)
    );
  }

  $onDestroy() {
    this.storeUnsubscribe();
    this.$element = null;
  }

  getInitialState() {
    return this.getNewState();
  }

  select(state) {
    return {stateLoaded: this.selectorsService.stateLoadedSelector(state)};
  }

  getAppContainer() {
    return this.$element.find('[md-component-id="app-container"]');
  }

  getToolbar() {
    return this.$element.find('ds-toolbar').controller('dsToolbar');
  }
}

export const app = {
  template: `
    <ds-toolbar ng-if="dsApp.state.stateLoaded"></ds-toolbar>

    <section md-component-id="app-container" ng-if="dsApp.state.stateLoaded" layout="row"
             layout-fill layout-align="start stretch" flex>
      <ds-main-menu></ds-main-menu>

      <main layout="row" flex ng-outlet></main>
    </section>

    <main ng-if="!dsApp.state.stateLoaded" flex layout="column" layout-fill>
      <ds-launch-screen status="dsApp.state.stateLoaded"></ds-launch-screen>
    </main>
  `,
  controller: AppController,
  controllerAs: 'dsApp',
  $routeConfig: [
    {
      path: '/spendings/personal',
      component: 'dsPersonalSpendings',
      name: 'DsPersonalSpendings',
      useAsDefault: true
    },
    {
      path: '/spendings/family',
      component: 'dsFamilySpendings',
      name: 'DsFamilySpendings'
    }
  ]
};
