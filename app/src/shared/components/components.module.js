import {dsLaunchScreen} from './ds-launch-screen.component';
import {dsToolbar} from './ds-toolbar.component';
import {dsMainMenu} from './ds-main-menu.directive';
import {ComponentController} from './component.controller';

const Components = angular
  .module('components', [])
  .component('dsLaunchScreen', dsLaunchScreen)
  .component('dsToolbar', dsToolbar)
  .directive('dsMainMenu', dsMainMenu)
  .controller('ComponentController', ComponentController)
  .name
  ;

export default Components;
