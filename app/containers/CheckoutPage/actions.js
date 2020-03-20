import { UPDATEED_CACHE_ITEM, UPDATE_CACHE_ITEM } from './constants';

export const updateCacheItem = (items = []) => ({
  type: UPDATE_CACHE_ITEM,
  payload: items,
});

export const updatedCacheItem = (newItems = []) => ({
  type: UPDATEED_CACHE_ITEM,
  payload: newItems,
});
