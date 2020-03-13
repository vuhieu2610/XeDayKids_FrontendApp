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

export function getProductsByCategoryId({
  item = {},
  pageSize,
  pageIndex,
  sortBy,
}) {
  return request({
    method: 'post',
    url: `/ProductApi/GetProductsByCategoryId`,
    data: {
      Item: item,
      PageSize: pageSize,
      PageIndex: pageIndex,
      SortBy: sortBy,
    },
  });
}

export function getPromotionProducts({ pageSize, pageIndex, sortBy }) {
  const body = {
    PageIndex: pageIndex,
    PageSize: pageSize,
    SortBy: sortBy,
    Filters: [
      {
        field: 'PromotionId',
        op: `&(INN`,
        value: 0
      },
      {
        field: 'PromotionId',
        op: `&<>)`,
        value: 0,
      },
    ],
  };
  return request({
    method: 'post',
    url: `ProductApi/GetProductList`,
    data: body,
  });
}
