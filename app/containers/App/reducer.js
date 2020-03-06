/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  CHANGE_BREADCUMBS_STATE,
  ADD_TO_CART,
  EXCLUDE_ITEM,
  SCREEN_RESIZE,
  CATEGORIES_FETCHED,
  SET_SEARCH_PLACEHOLDER,
  CATEGORIES_FETCH
} from './constants';

export const initalState = {
  logo: 'https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg',
  location: 'Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội',
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  searchPlaceholder: '',
  cart: {
    cartItems: []
  },
  categories: {
    isLoading: false,
    data: [
      {
        CategoryId: 1,
        Name: 'Xe Đẩy 4 bánh',
        Image: 'https://img.icons8.com/carbon-copy/100/000000/boy-stroller.png'
      },
      {
        CategoryId: 2,
        Name: 'Xe Đẩy có mái che',
        Image: 'https://img.icons8.com/carbon-copy/100/000000/boy-stroller.png'
      },
      {
        CategoryId: 3,
        Name: 'Xe Đẩy du lịch',
        Image: 'https://img.icons8.com/carbon-copy/100/000000/boy-stroller.png'
      },
      {
        CategoryId: 4,
        Name: 'Xe Đẩy gấp gọn',
        Image: 'https://img.icons8.com/carbon-copy/100/000000/boy-stroller.png'
      },
      {
        CategoryId: 5,
        Name: 'Xe Đẩy đôi',
        Image: 'https://img.icons8.com/carbon-copy/100/000000/boy-stroller.png'
      }
    ],
    hasError: false
  }
};

const appReducer = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_TO_CART:
        draft.cart.cartItems.push(action.payload);
        break;
      case EXCLUDE_ITEM:
        _.remove(draft, item => _.eq(item.Id, action.payload.Id));
        break;
      case SCREEN_RESIZE:
        draft.screenWidth = action.payload;
        break;
      case CATEGORIES_FETCH:
        draft.categories.isLoading = true;
        break;
      case CATEGORIES_FETCHED:
        const { data } = action.payload;
        draft.categories.isLoading = false;
        if (!data.Success) {
          draft.categories.hasError = true;
        } else {
          draft.categories.data = data.DataList;
        }
        break;
      case SET_SEARCH_PLACEHOLDER:
        draft.searchPlaceholder = action.payload;
        break;
      default:
        break;
    }
  });

export default appReducer;
