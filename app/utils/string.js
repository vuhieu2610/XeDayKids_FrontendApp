/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
import speakingurl from 'speakingurl';
import _ from 'lodash';
import { APP_CACHE_DATA_STORE_KEY } from '../containers/App/constants';

export const getSlug = string =>
  speakingurl(string, {
    lang: 'vi',
  });
export const defaultArray = length => {
  const rs = [];
  for (let i = 0; i < length; i++) {
    rs.push(i);
  }
  return rs;
};

export const toMoney = num =>
  `${num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} ₫`;

export const isNullOrUndefined = value =>
  _.isUndefined(value) || _.isNull(value);

export const getValueFromSiteConfigs = ({
  siteConfigs,
  defaultValue,
  configKey,
}) => {
  if (_.isEmpty(siteConfigs)) return defaultValue;
  const findKey = siteConfigs.find(config => _.eq(config.ConfigKey, configKey));

  return isNullOrUndefined(findKey) ? defaultValue : findKey.ConfigValue;
};

export const setCacheData = item => {
  setTimeout(() => {
    const stringItem = JSON.stringify(item);
    localStorage.setItem(APP_CACHE_DATA_STORE_KEY, stringItem);
  }, 0);
};
export const cacheData = (() => {
  const defaultCacheData = {
    cartData: {
      totals: {
        items: [],
      },
      address: {},
    },
    siteData: {
      siteConfigs: [],
      categories: [],
    },
    cacheItems: {},
    location: {
      province: null,
      district: null,
      name: '',
      phone: null,
      emai: '',
      address: '',
      note: '',
    },
  };
  try {
    let stringData = localStorage.getItem(APP_CACHE_DATA_STORE_KEY);
    if (!stringData) {
      stringData = JSON.stringify(defaultCacheData);
      setCacheData(defaultCacheData);
    }
    return JSON.parse(stringData);
  } catch (err) {
    return defaultCacheData;
  }
})();

export const getRouteUrl = (name, params = {}) => {
  const _route = {
    HomePage: '/',
    CheckoutPage: '/checkout/cart',
    ListPage: `/category/${params.slug || ':slug'}.${params.id || ':id'}`,
    PromotionPage: `/khuyen-mai`,
    SearchPage: `/tim-kiem/${params.searchContent || ':searchContent'}`,
    DetailPage: `/san-pham/${params.slug || ':slug'}.${params.productId ||
      ':productId'}`,
  };

  return _route[name];
};
