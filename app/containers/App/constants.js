/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_BREADCUMBS_STATE = 'app/CHANGE_BREADCUMBS_STATE';
export const ADD_TO_CART = 'app/ADD_TO_CART';
export const EXCLUDE_ITEM = 'app/EXCLUDE_ITEM';
export const REMOVE_ITEM = 'app/REMOVE_ITEM';
export const SCREEN_RESIZE = 'app/SCREEN_RESIZE';
export const CATEGORIES_FETCH = 'app/CATEGORIES_FETCH';
export const CATEGORIES_FETCHED = 'app/CATEGORIES_FETCHED';
export const SET_SEARCH_PLACEHOLDER = 'app/SET_SEARCH_PLACEHOLDER';
export const TOGGLE_LOCATION_MODAL = 'app/TOGGLE_LOCATION_MODAL';
export const SITE_CONFIG_FETCH = 'app/SITE_CONFIG_FETCH';
export const SITE_CONFIG_FETCHED = 'app/SITE_CONFIG_FETCHED';
export const SET_SITE_CONFIGS = 'app/SET_SITE_CONFIGS';
export const ADD_ITEM_TO_CACHE = 'app/ADD_ITEM_TO_CACHE';

export const APP_CACHE_DATA_STORE_KEY = 'app/app-cache-data';
export const SET_PROVINCE_DATA = 'app/SET_PROVINCE_DATA';
export const FETCH_PROVINCE_DATA = 'app/FETCH_PROVINCE_DATA';
export const SET_USER_LOCATION = 'app/SET_USER_LOCATION';