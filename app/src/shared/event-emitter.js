import EventEmitter from 'events';

export const emitter = new EventEmitter();

export const HTTP_RESPONSE = 'httpResponse';
export const HTTP_RESPONSE_ERROR = 'httpResponseError';
export const ROUTE_CHANGE_SUCCESS = '$routeChangeSuccess';
export const LOCATION_CHANGE_SUCCESS = '$locationChangeSuccess';
export const STORE_DISPATCH = 'store.dispatch';
