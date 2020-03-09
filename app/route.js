import HomePage from './containers/HomePage/Loadable';
import DetailPage from './containers/DetailPage/Loadable';
import CheckoutPage from './containers/CheckoutPage';
import ListPage from './containers/ListPage';

const route = [
  {
    name: 'HomePage',
    component: HomePage,
    extract: true,
    path: '/',
  },
  {
    component: CheckoutPage,
    name: 'CheckoutPage',
    extract: true,
    path: '/checkout/cart',
  },
  {
    component: ListPage,
    name: 'ListPage',
    extract: true,
    path: '/category/:slug.:id',
  },
  {
    component: DetailPage,
    name: 'DetailPage',
    extract: true,
    path: '/:slug.:productId',
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
