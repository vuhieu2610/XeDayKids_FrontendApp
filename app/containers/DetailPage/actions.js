/*
 *
 * DetailPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import request from '../../utils/request';
import { ADD_ITEM_TO_CACHE } from '../App/constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const getDetail = productId =>
  request({
    method: 'POST',
    url: `/ProductApi/GetProductById/${productId}`,
  });

export const addItemToCache = item => ({
  type: ADD_ITEM_TO_CACHE,
  payload: item,
});
