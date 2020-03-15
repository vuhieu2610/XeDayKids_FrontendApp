/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  ADD_TO_CART,
  EXCLUDE_ITEM,
  SCREEN_RESIZE,
  CATEGORIES_FETCHED,
  SET_SEARCH_PLACEHOLDER,
  CATEGORIES_FETCH,
  TOGGLE_LOCATION_MODAL,
  CHANGE_BREADCUMBS_STATE,
  SITE_CONFIG_FETCH,
  SITE_CONFIG_FETCHED,
  SET_SITE_CONFIGS,
} from './constants';

export const initalState = {
  logo: 'https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg',
  location: '',
  hotLine: '123456567',
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  searchPlaceholder: '',
  cart: [],
  categories: {
    isLoading: false,
    data: [],
    hasError: false,
  },
  locationModalState: false,
  breadcrumbs: {
    displayable: false,
    items: [],
  },
  site: {
    siteConfigs: [],
    categories: [],
    hasError: false,
    loading: false,
  },
};

const appReducer = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_BREADCUMBS_STATE:
        draft.breadcrumbs = action.payload;
        break;
      case ADD_TO_CART:
        draft.cartItems.push(action.payload);
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
        if (!data) {
          draft.categories.hasError = true;
          draft.categories.data = [];
          return;
        }
        if (!data.Success) {
          draft.categories.hasError = true;
        } else {
          draft.categories.data = data.DataList;
        }
        break;
      case SET_SEARCH_PLACEHOLDER:
        draft.searchPlaceholder = action.payload;
        break;
      case TOGGLE_LOCATION_MODAL:
        draft.locationModalState = !draft.locationModalState;
        break;
      case SITE_CONFIG_FETCH:
        draft.site.loading = true;
        break;
      case SITE_CONFIG_FETCHED:
        const { HasError, Data } = action.payload;
        draft.site.loading = false;
        if (HasError) {
          draft.site.hasError = true;
          return;
        }

        draft.site.siteConfigs = Data.siteConfigs;
        draft.site.categories = Data.categories;
        break;
      case SET_SITE_CONFIGS:
        draft.site = action.payload;
        break;
      default:
        break;
    }
  });

export default appReducer;
