import {ComponentController} from '~/shared/components/component.controller';

export class DsToolbarController extends ComponentController {
  /*@ngInject*/
  constructor($window, $rootRouter) {
    super();
    this.$window = $window;
    this.$rootRouter = $rootRouter;
    this.title = 'Datasapiens';
  }

  $onDestroy() {
    this.$window = null;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }
}

export const dsToolbar = {
  require: {
    dsApp: '^^'
  },
  template: require('./ds-toolbar.component.html'),
  controller: DsToolbarController,
  controllerAs: 'dsToolbar'
};
