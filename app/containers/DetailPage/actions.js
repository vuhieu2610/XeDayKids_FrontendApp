/*
 *
 * DetailPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import request from '../../utils/request';

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
