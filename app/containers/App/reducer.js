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
  ADD_ITEM_TO_CACHE,
  SET_PROVINCE_DATA,
  SET_USER_LOCATION,
  REMOVE_ITEM,
} from './constants';
import { cacheData, setCacheData } from '../../utils/string';
import { UPDATEED_CACHE_ITEM } from '../CheckoutPage/constants';

export const initalState = (() => {
  const defaultState = {
    logo: 'https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg',
    location: {
      province: null,
      district: null,
      address: '',
      name: '',
      phone: null,
      emai: '',
      note: '',
    },
    hotLine: '123456567',
    screenWidth: typeof window === 'object' ? window.innerWidth : null,
    searchPlaceholder: '',
    cartData: {
      totals: {
        items: [],
      },
      address: {},
    },
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
    cacheItems: {},
    ProvinceData: [],
    site: {
      siteConfigs: [],
      categories: [],
      hasError: false,
      loading: false,
    },
  };

  if (cacheData.logo) defaultState.logo = cacheData.logo;
  if (cacheData.hotLine) defaultState.hotLine = cacheData.hotLine;
  if (cacheData.location) defaultState.location = cacheData.location;
  if (cacheData.cartData) defaultState.cartData = cacheData.cartData;
  if (cacheData.siteData) {
    defaultState.site.siteConfigs = cacheData.siteData.siteConfigs;
    defaultState.site.categories = cacheData.siteData.categories;
  }

  if (cacheData.location) defaultState.location = cacheData.location;

  if (cacheData.cacheItems) {
    defaultState.cacheItems = cacheData.cacheItems;
  }

  return defaultState;
})();

const appReducer = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_BREADCUMBS_STATE:
        draft.breadcrumbs = action.payload;
        break;
      case ADD_TO_CART: {
        const { ProductId, Quantity } = action.payload;
        const { items } = draft.cartData.totals;
        const { items: cacheItems } = cacheData.cartData.totals;

        const findItemIndex = items.findIndex(i =>
          _.eq(i.ProductId, ProductId),
        );

        const findCacheItemIndex = cacheItems.findIndex(i =>
          _.eq(i.ProductId, ProductId),
        );

        if (findItemIndex > -1) {
          items[findItemIndex].Quantity += Quantity;
        } else {
          items.push(action.payload);
        }

        if (findCacheItemIndex > -1) {
          cacheItems[findItemIndex].Quantity += Quantity;
        } else {
          cacheItems.push(action.payload);
        }

        cacheData.cartData.totals.items = cacheItems;
        setCacheData(cacheData);
        break;
      }
      case EXCLUDE_ITEM: {
        const { ProductId } = action.payload;
        const { items } = draft.cartData.totals;
        const { items: cacheItems } = cacheData.cartData.totals;

        const findItemIndex = items.findIndex(i =>
          _.eq(i.ProductId, ProductId),
        );

        const findCacheItemIndex = cacheItems.findIndex(i =>
          _.eq(i.ProductId, ProductId),
        );

        if (findItemIndex > -1) {
          items[findItemIndex].Quantity -= 1;
        }

        if (items[findItemIndex].Quantity < 1) {
          items[findItemIndex].Quantity = 1;
        }

        if (findCacheItemIndex > -1) {
          cacheItems[findItemIndex].Quantity -= 1;
        }

        if (cacheItems[findItemIndex].Quantity < 1) {
          cacheItems[findItemIndex].Quantity = 1;
        }

        cacheData.cartData.totals.items = cacheItems;
        setCacheData(cacheData);

        break;
      }

      case REMOVE_ITEM: {
        const { ProductId } = action.payload;
        const { items } = draft.cartData.totals;
        const { items: cacheItems } = cacheData.cartData.totals;

        _.remove(items, n => _.eq(n.ProductId, ProductId));
        _.remove(cacheItems, n => _.eq(n.ProductId, ProductId));

        cacheData.cartData.totals.items = cacheItems;
        setCacheData(cacheData);
        break;
      }

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

        if (!cacheData.siteData) {
          cacheData.siteData = {
            categories: null,
            siteConfigs: null,
          };
        }
        cacheData.siteData.categories = draft.site.categories;
        cacheData.siteData.siteConfigs = draft.site.siteConfigs;
        setCacheData(cacheData);
        break;
      case SET_SITE_CONFIGS:
        draft.site = action.payload;
        break;
      case ADD_ITEM_TO_CACHE: {
        const { payload } = action;
        draft.cacheItems[payload.ProductId] = payload;

        cacheData.cacheItems[payload.ProductId] = { ...payload };
        setCacheData(cacheData);
        break;
      }
      case UPDATEED_CACHE_ITEM: {
        const { payload } = action;
        payload.forEach(item => {
          draft.cacheItems[item.ProductId] = item;
          cacheData.cacheItems[item.ProductId] = { ...item };
        });
        draft.cartData.totals.items.map(item => {
          const cacheItem = draft.cacheItems[item.ProductId];
          if (cacheItem) {
            item.ProductName = cacheItem.Name;
            item.PromotionCode = cacheItem.PromotionCode;
            item.Images = cacheItem.Images;
            item.ProductPrice = cacheItem.Price;
            item.PromotionPrice = cacheItem.PromotionPrice;
          }
          return item;
        });
        setCacheData(cacheData);
        break;
      }

      case SET_PROVINCE_DATA:
        draft.ProvinceData = action.payload;
        break;

      case SET_USER_LOCATION:
        draft.location = action.payload;

        if (!cacheData.location) {
          cacheData.location = {
            province: null,
            district: null,
            address: '',
          };
        }
        cacheData.location.province = action.payload.province;
        cacheData.location.district = action.payload.district;
        cacheData.location.address = action.payload.address;
        setCacheData(cacheData);
        break;
      default:
        break;
    }
  });

export default appReducer;
