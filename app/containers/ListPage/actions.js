/*
 *
 * ListPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import request from '../../utils/request';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProductsByCategoryId({ item = {}, pageSize, pageIndex }) {
  return request({
    method: 'post',
    url: `/ProductApi/GetProductsByCategoryId`,
    data: {
      Item: item,
      PageSize: pageSize,
      PageIndex: pageIndex,
    },
  });
}

export function getPromotionProducts({ pageSize, pageIndex }) {
  const body = {
    PageIndex: pageIndex,
    PageSize: pageSize,
  };
  return request({
    method: 'post',
    url: `ProductApi/GetProductList`,
    data: body,
  });
}
