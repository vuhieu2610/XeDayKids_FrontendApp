import {
  CHANGE_BREADCUMBS_STATE,
  ADD_TO_CART,
  EXCLUDE_ITEM,
  CATEGORIES_FETCH,
  CATEGORIES_FETCHED,
  SET_SEARCH_PLACEHOLDER,
  TOGGLE_LOCATION_MODAL,
  SITE_CONFIG_FETCH,
  SITE_CONFIG_FETCHED,
  SET_SITE_CONFIGS,
  SET_PROVINCE_DATA,
  FETCH_PROVINCE_DATA,
  SET_USER_LOCATION,
  REMOVE_ITEM,
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

export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
}

export function getCategories() {
  return {
    type: CATEGORIES_FETCH,
  };
}

export function categoriesLoaded(repos) {
  return {
    type: CATEGORIES_FETCHED,
    payload: repos,
  };
}

export function setSearchPlaceholder(content) {
  return {
    type: SET_SEARCH_PLACEHOLDER,
    payload: content,
  };
}

export function toggleLocationModal() {
  return {
    type: TOGGLE_LOCATION_MODAL,
  };
}

export function makeRequestGetHomeData() {
  return {
    type: SITE_CONFIG_FETCH,
  };
}

export function homeDataFetched(response) {
  return {
    type: SITE_CONFIG_FETCHED,
    payload: response,
  };
}

export function setSiteConfigs(siteConfigs) {
  return {
    type: SET_SITE_CONFIGS,
    payload: siteConfigs,
  };
}

export function setProvinceData(provinces) {
  return {
    type: SET_PROVINCE_DATA,
    payload: provinces,
  };
}

export function getProvinceData() {
  return {
    type: FETCH_PROVINCE_DATA,
  };
}

export function setUserLocation(location) {
  return {
    type: SET_USER_LOCATION,
    payload: location,
  };
}
