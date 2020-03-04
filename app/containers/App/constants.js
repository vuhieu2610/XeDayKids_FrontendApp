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
export const SCREEN_RESIZE = 'app/SCREEN_RESIZE';
