import {
  CHANGE_BREADCUMBS_STATE,
  ADD_TO_CART,
  EXCLUDE_ITEM,
  CATEGORIES_FETCH,
  CATEGORIES_FETCHED
} from './constants';

export function setBreadcrumbs(state) {
  return {
    type: CHANGE_BREADCUMBS_STATE,
    payload: state
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item
  };
}

export function excludeItem(item) {
  return {
    type: EXCLUDE_ITEM,
    payload: item
  };
}

export function getCategories() {
  return {
    type: CATEGORIES_FETCH
  };
}

export function categoriesLoaded(repos) {
  return {
    type: CATEGORIES_FETCHED,
    payload: repos
  };
}
