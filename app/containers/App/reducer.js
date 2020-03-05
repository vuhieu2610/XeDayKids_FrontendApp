/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  CHANGE_BREADCUMBS_STATE,
  ADD_TO_CART,
  EXCLUDE_ITEM,
  SCREEN_RESIZE,
  CATEGORIES_FETCHED
} from './constants';

export const initalState = {
  logo: 'https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg',
  location: 'Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội',
  breadcrumbs: {
    displayable: false,
    items: []
  },
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  cart: {
    cartItems: []
  }
};

const appReducer = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_BREADCUMBS_STATE:
        draft.breadcrumbs = action.payload;
        break;
      case ADD_TO_CART:
        draft.cart.cartItems.push(action.payload);
        break;
      case EXCLUDE_ITEM:
        _.remove(draft, item => _.eq(item.Id, action.payload.Id));
        break;
      case SCREEN_RESIZE:
        draft.screenWidth = action.payload;
        break;
      case CATEGORIES_FETCHED:
        break;
      default:
        break;
    }
  });

export default appReducer;
