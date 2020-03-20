import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { updatedCacheItem } from './actions';
import { UPDATE_CACHE_ITEM } from './constants';

const makeRequestGetItems = (items = []) =>
  request({
    url: `ProductApi/GetProductList`,
    method: 'POST',
    data: {
      PageSize: 0,
      PageIndex: 0,
      Filters: [
        {
          field: 'ProductId',
          op: '&innumber()',
          value: items.join(','),
        },
      ],
    },
  });

export function* getItemsWatcher(action) {
  try {
    const req = yield call(makeRequestGetItems, action.payload);
    const { data } = req;

    if (data.HasDataList) {
      yield put(updatedCacheItem(data.DataList));
    }
  } catch (err) {
    //
  }
}

// Individual exports for testing
export default function* checkoutPageSaga() {
  yield takeLatest(UPDATE_CACHE_ITEM, getItemsWatcher);
}
