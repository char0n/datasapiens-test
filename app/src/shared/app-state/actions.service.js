import {createAction} from 'redux-actions';

export const state = {
  setLoaded: createAction('state.setLoaded')
};

export const result = {
  setUserList: createAction('result.setUserList'),
  setCategoryList: createAction('result.setCategoryList')
};

export const users = {
  list: createAction('users.list')
};

export const categories = {
  list: createAction('categories.list')
};

export const entries = {
  list: createAction('entries.list')
};
