import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { CATEGORIES_FETCH } from './constants';
import { categoriesLoaded } from './actions';

function reqCategories() {
  return request({
    method: 'post',
    url: '/CategoryApi/FEGetCategories'
  });
}

export function* getCategoriesActionWatcher() {
  try {
    const req = yield call(reqCategories);
    yield put(categoriesLoaded(req));
  } catch (err) {
    yield put(categoriesLoaded(err));
  }
}

export default function* AppSaga() {
  yield takeLatest(CATEGORIES_FETCH, getCategoriesActionWatcher);
}
