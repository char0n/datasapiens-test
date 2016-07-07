import {isUndefined} from 'lodash';

import * as selectorsService from './selectors.service';

export function rootReducer(state, action) {
  return {
    stateLoaded: stateLoaded(selectorsService.stateLoadedSelector(state), action),
    currentUserId: null,
    result: {
      users: resultUsers(selectorsService.resultUsersSelector(state), action),
      categories: resultCategories(selectorsService.resultCategoriesSelector(state), action)
    },
    entities: {
      users: users(selectorsService.userEntitiesSelector(state), action),
      categories: categories(selectorsService.categoryEntitiesSelector(state), action),
      entries: entries(selectorsService.entryEntitiesSelector(state), action)
    }
  };
}

export function stateLoaded(state, action) {
  switch (action.type) {
    case 'state.setLoaded': {
      return action.payload;
    }
    default: {
      return isUndefined(state) ? null : state;
    }
  }
}

export function users(state, action) {
  switch (action.type) {
    case 'users.list': {
      return action.payload.reduce((reducedState, user) => {
        reducedState[user.id] = user;
        return reducedState;
      }, {});
    }
    default: {
      return isUndefined(state) ? {} : state;
    }
  }
}

export function categories(state, action) {
  switch (action.type) {
    case 'categories.list': {
      return action.payload.reduce((reducedState, category) => {
        reducedState[category.id] = category;
        return reducedState;
      }, {});
    }
    default: {
      return isUndefined(state) ? {} : state;
    }
  }
}

export function entries(state, action) {
  switch (action.type) {
    case 'entries.list': {
      return action.payload.reduce((reducedState, entry) => {
        const amount = parseInt(entry.amount, 10);
        reducedState[entry.id] = Object.assign({}, entry, {amount: entry.type === 'expense' ? -amount : amount});
        return reducedState;
      }, {});
    }
    default: {
      return isUndefined(state) ? {} : state;
    }
  }
}

export function resultUsers(state, action) {
  switch (action.type) {
    case 'result.setUserList': {
      return action.payload.map(user => user.id);
    }
    default: {
      return isUndefined(state) ? [] : state;
    }
  }
}

export function resultCategories(state, action) {
  switch (action.type) {
    case 'result.setCategoryList': {
      return action.payload.map(user => user.id);
    }
    default: {
      return isUndefined(state) ? [] : state;
    }
  }
}
