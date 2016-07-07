import {parse as urlParse, format as urlFormat} from 'url';
import {flow, partial, partialRight, toPairs, isArray} from 'lodash';

import * as actionsService from './actions.service';
import {emitter as eventEmitter, HTTP_RESPONSE, HTTP_RESPONSE_ERROR} from '~/shared/event-emitter';

const apiHost = 'http://localhost:3000/api';
const isResponsePrettified = NODE_ENV === 'development';
const _ = partial.placeholder;
export const getFullUrl = partialRight(appendPathnameToHost, apiHost);
export const prettifyUrl = partial(addPrettyParamToUrl, isResponsePrettified);
export const apiMethod = flow(apiMethodToUrl, getFullUrl, prettifyUrl);
export const apiMethodWithParams = partial(apiMethodWithParamsFactory, _, _, addUrlParams, apiMethod);
export const errorResponseCycle = flow(processErrorResponse);
export const standardResponseCycle = flow(parseJSON);

export const users = {
  list: partial(usersListFactory, fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService)
};

export const categories = {
  list: partial(categoriesListFactory, fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService)
};

export const entries = {
  list: partial(entriesListFactory, fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService)
};

export const state = {
  load: partial(stateLoadFactory, users, categories, entries, actionsService)
};

///////////
// Utils //
///////////
export function apiMethodToUrl(methodName) {
  return `/${methodName}`;
}

export function appendPathnameToHost(pathname, host) {
  const parsedUrl = urlParse(host);
  parsedUrl.pathname += pathname;
  return urlFormat(parsedUrl);
}

export function addPrettyParamToUrl(isPretty, url) {
  const parsedUrl = urlParse(url, true);

  delete parsedUrl.search;
  parsedUrl.query.pretty = isPretty;

  return urlFormat(parsedUrl);
}

export function addUrlParams(url, params) {
  const parsedUrl = urlParse(url, true);

  delete parsedUrl.search;
  Object.assign(parsedUrl.query, params);

  return urlFormat(parsedUrl);
}

export function apiMethodWithParamsFactory(methodName, params = {}, addUrlParams, apiMethod) {
  return addUrlParams(apiMethod(methodName), params);
}

export function processErrorResponse(ex) {
  eventEmitter.emit(HTTP_RESPONSE, undefined);
  eventEmitter.emit(HTTP_RESPONSE_ERROR, ex);
  throw ex;
}

export function parseJSON(response) {
  return response.json();
}

export function flatDataToFormData(data) {
  return toPairs(data).reduce((previousValue, currentValue) => {
    const key = currentValue[0];
    const value = currentValue[1] === null ? '' : currentValue[1];

    if (isArray(value)) {
      value.forEach(item => previousValue.append(key, item));
    } else {
      previousValue.set(key, value);
    }

    return previousValue;
  }, new window.FormData());
}

//////////////////////////
// Api action factories //
//////////////////////////
export function stateLoadFactory(usersActions, categoriesActions, entriesActions, actionsService) {
  return dispatch => {
    const usersListPromise = dispatch(usersActions.list());
    const categoriesListPromise = dispatch(categoriesActions.list());
    const entriesListPromise = dispatch(entriesActions.list());

    return Promise.all([usersListPromise, categoriesListPromise, entriesListPromise])
      .then(partial(dispatch, actionsService.state.setLoaded(true)))
      .catch(partial(dispatch, actionsService.state.setLoaded(false)))
      ;
  };
}

export function usersListFactory(fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService) {
  return dispatch => fetch(apiMethod('users.list'))
    .catch(errorResponseCycle)
    .then(standardResponseCycle)
    .then(data => {
      const usersListAction = dispatch(actionsService.users.list(data));
      const setUserListAction = dispatch(actionsService.result.setUserList(data));

      return [data, usersListAction, setUserListAction];
    })
    ;
}

export function categoriesListFactory(fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService) {
  return dispatch => fetch(apiMethod('categories.list'))
    .catch(errorResponseCycle)
    .then(standardResponseCycle)
    .then(data => {
      const categoriesListAction = dispatch(actionsService.categories.list(data));
      const setCategoryListAction = dispatch(actionsService.result.setCategoryList(data));

      return [data, categoriesListAction, setCategoryListAction];
    })
    ;
}

export function entriesListFactory(fetch, apiMethod, standardResponseCycle, errorResponseCycle, actionsService) {
  return dispatch => fetch(apiMethod('entries.list'))
    .catch(errorResponseCycle)
    .then(standardResponseCycle)
    .then(data => {
      const entriesListAction = dispatch(actionsService.entries.list(data));

      return [data, entriesListAction];
    })
    ;
}
