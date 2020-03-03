import {
  CHANGE_BREADCUMBS_STATE,
  ADD_TO_CART,
  EXCLUDE_ITEM,
} from './constants';

export function setBreadcrumbs(state) {
  return {
    type: CHANGE_BREADCUMBS_STATE,
    payload: state,
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function excludeItem(item) {
  return {
    type: EXCLUDE_ITEM,
    payload: item,
  };
}
