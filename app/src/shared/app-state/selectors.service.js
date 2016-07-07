import {values, find} from 'lodash';
import {createSelector} from 'reselect';

//////////////////////
// Input selectors. //
//////////////////////
export function stateLoadedSelector(state) {
  return state.stateLoaded;
}

export function currentUserIdSelector(state) {
  return find(values(state.entities.users), {firstname: 'Vladimir', lastname: 'Gorej'}).id;
}

export function userEntitiesSelector(state) {
  return state.entities.users;
}

export function categoryEntitiesSelector(state) {
  return state.entities.categories;
}

export function entryEntitiesSelector(state) {
  return state.entities.entries;
}

export function resultUsersSelector(state) {
  return state.result.users;
}

export function resultCategoriesSelector(state) {
  return state.result.categories;
}

/////////////////////////
// Combined selectors. //
/////////////////////////
export const currentUserSelector = createSelector(
  [currentUserIdSelector, userEntitiesSelector],
  (currentUserId, userEntities) => userEntities[currentUserId]
);
