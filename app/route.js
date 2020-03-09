/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import HomePage from './containers/HomePage/Loadable';
import DetailPage from './containers/DetailPage/Loadable';
import CheckoutPage from './containers/CheckoutPage';
import ListPage from './containers/ListPage';

export const getRouteUrl = (name, params = {}) => {
  const _route = {
    HomePage: '/',
    CheckoutPage: '/checkout/cart',
    ListPage: `/category/${params.slug || ':slug'}.${params.id || ':id'}`,
    PromotionPage: `/khuyen-mai`,
    DetailPage: `/${params.slug || ':slug'}.${params.productId ||
      ':productId'}`,
  };

  return _route[name];
};

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

export const breadcrumbRoutes = [
  {
    path: '/',
    breadcrumbName: 'Trang chủ',
  },
  {
    path: ':slug',
    breadcrumbName: 'Trang chi tiết',
  },
];

export default route;
