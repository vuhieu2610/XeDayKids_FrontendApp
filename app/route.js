/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import HomePage from './containers/HomePage/Loadable';
import DetailPage from './containers/DetailPage/Loadable';
import CheckoutPage from './containers/CheckoutPage';
import ListPage from './containers/ListPage';
import SearchPage from './containers/SearchPage/Loadable';
import { getRouteUrl } from './utils/string';

const route = [
  {
    name: 'HomePage',
    component: HomePage,
    extract: true,
    path: getRouteUrl('HomePage'),
  },
  {
    component: CheckoutPage,
    name: 'CheckoutPage',
    extract: true,
    path: getRouteUrl('CheckoutPage'),
  },
  {
    component: SearchPage,
    name: 'SearchPage',
    extract: true,
    path: getRouteUrl('SearchPage'),
  },
  {
    component: ListPage,
    name: 'ListPage',
    extract: true,
    path: getRouteUrl('ListPage'),
  },
  {
    component: ListPage,
    name: 'PromotionPage',
    extract: true,
    path: getRouteUrl('PromotionPage'),
  },
  {
    component: DetailPage,
    name: 'DetailPage',
    extract: true,
    path: getRouteUrl('DetailPage'),
  },
];

export default route;
