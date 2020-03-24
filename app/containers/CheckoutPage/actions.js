import request from '../../utils/request';
import {
  UPDATEED_CACHE_ITEM,
  UPDATE_CACHE_ITEM,
  CLEAR_CART,
} from './constants';

export const updateCacheItem = (items = []) => ({
  type: UPDATE_CACHE_ITEM,
  payload: items,
});

export const updatedCacheItem = (newItems = []) => ({
  type: UPDATEED_CACHE_ITEM,
  payload: newItems,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const makeRequestOrder = async item => {
  const req = await request({
    url: 'CartApi/Insert',
    method: 'POST',
    data: {
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      Total: item.total,
      items: item.items,
    },
  });

  return req.data;
};
