///////////////////////////////////////////////////////////////
// Babel is  putting import ahead of requires so be CAUTIOUS //
///////////////////////////////////////////////////////////////

// Angular 1.x
require('expose?$!expose?jQuery!jquery');
require('angular');
require('@angular/router/angular1/angular_1_router');
const ngLocale = require('angular-i18n/en-gb');
const ngMessageFormat = require('angular-message-format');
const ngAnimate = require('angular-animate');
const ngAria = require('angular-aria');
const ngCookies = require('angular-cookies');
const ngMaterial = require('angular-material');
const ngSanitize = require('angular-sanitize');
const ngMessages = require('angular-messages');

// Vendor.
require('es6-shim');
const es6Promise = require('es6-promise');
require('./shared/moment');
require('fullcalendar');
require('fullcalendar/dist/lang/en-gb');
require('imports?this=>global!exports?global.fetch!whatwg-fetch');
require('expose?Chart!chart.js');
require('angular-chart.js');

// Project.
const appConfig = require('./app.config');
const app = require('./app.component');
const Components = require('./shared/components/components.module').default;
const Filters = require('./shared/filters/filters.module').default;
const AppState = require('./shared/app-state/app-state.module').default;
const Spendings = require('./spendings/spendings.module').default;

require('../styles/main.scss');

// Polyfill the global environment.
es6Promise.polyfill();

angular
  .module('app', [
    ngLocale,
    ngMessageFormat,
    ngAnimate,
    ngAria,
    ngCookies,
    ngSanitize,
    ngMessages,
    ngMaterial,
    'ngComponentRouter',
    'chart.js',

    AppState,
    Components,
    Filters,
    Spendings
  ])
  .value('$routerRootComponent', 'dsApp')
  .config(appConfig.configureCompileProvider)
  .run(appConfig.configureMoment)
  .run(appConfig.configureAngularDigest)
  .run(appConfig.loadApplicationData)
  .component('dsApp', app.app)
;
