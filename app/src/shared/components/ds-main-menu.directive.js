import {emitter as eventEmitter, ROUTE_CHANGE_SUCCESS} from '~/shared/event-emitter';

class DsMainMenuController {
  /*@ngInject*/
  constructor($rootRouter) {
    this.$rootRouter = $rootRouter;
    this.eventEmitter = eventEmitter;
    this.activeMenuItem = 'personal';
    this.$routeChangeSuccessHandler = this.$routeChangeSuccessHandlerFactory.bind(this);
    this.personalSpendingsInstruction = this.$rootRouter.generate(['DsPersonalSpendings']);
    this.familySpendingsInstruction = this.$rootRouter.generate(['DsFamilySpendings']);
  }

  $onInit() {
    this.eventEmitter.on(ROUTE_CHANGE_SUCCESS, this.$routeChangeSuccessHandler);
  }

  $onDestroy() {
    this.eventEmitter.removeListener(ROUTE_CHANGE_SUCCESS, this.$routeChangeSuccessHandler);
  }

  $routeChangeSuccessHandlerFactory() {
    if (this.$rootRouter.isRouteActive(this.personalSpendingsInstruction)) {
      this.activeMenuItem = 'personal';
    } else if (this.$rootRouter.isRouteActive(this.familySpendingsInstruction)) {
      this.activeMenuItem = 'family';
    } else {
      this.activeMenuItem = null;
    }
  }

  navigateToPersonalSpendings() {
    this.$rootRouter.navigate(['DsPersonalSpendings']);
  }

  navigateToFamilySpendings() {
    this.$rootRouter.navigate(['DsFamilySpendings']);
  }
}

export function dsMainMenu() {
  return {
    restrict: 'E',
    replace: true,
    controller: DsMainMenuController,
    controllerAs: 'dsMainMenu',
    template: require('./ds-main-menu.directive.html')
  };
}
