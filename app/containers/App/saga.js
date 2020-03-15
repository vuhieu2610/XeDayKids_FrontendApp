import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { CATEGORIES_FETCH, SITE_CONFIG_FETCH } from './constants';
import { categoriesLoaded, homeDataFetched } from './actions';

function reqCategories() {
  return request({
    method: 'post',
    url: '/CategoryApi/GetCategories',
  });
}

async function makeRequestGetHomeData() {
  return (await request({
    url: '/HomeApi/Get',
    method: 'POST',
  })).data;
}

export function* getHomeDataWatcher() {
  try {
    const req = yield call(makeRequestGetHomeData);
    yield put(homeDataFetched(req));
  } catch (err) {
    yield put(homeDataFetched({ HasError: true }));
  }
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
  yield takeLatest(SITE_CONFIG_FETCH, getHomeDataWatcher);
}
