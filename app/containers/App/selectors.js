/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import _ from 'lodash';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectApp = state => state.app;

const makeSelectBreadcrumb = () =>
  createSelector(
    selectApp,
    state => state.breadcrumbs,
  );

const makeSelectUserLocation = () =>
  createSelector(
    selectApp,
    state => {
      const { location } = state;
      if (
        !location ||
        _.isEmpty(location.address) ||
        _.isNull(location.province) ||
        _.isNull(location.district)
      ) {
        return '';
      }

      return `${location.address} - ${location.district.DistrictName}, ${
        location.province.ProvinceName
      }`;
    },
  );

const makeSelectUserLocationObject = () =>
  createSelector(
    selectApp,
    state => state.location,
  );

const makeSelectScreenSize = () =>
  createSelector(
    selectApp,
    state => state.screenWidth,
  );

const makeSelectLogo = () =>
  createSelector(
    selectApp,
    state => state.logo,
  );

const makeSelectSearchPlaceholder = () =>
  createSelector(
    selectApp,
    state => state.searchPlaceholder,
  );

const makeSelectCategories = () =>
  createSelector(
    selectApp,
    state => state.categories,
  );

const makeSelectCartNumber = () =>
  createSelector(
    selectApp,
    state =>
      state.cartData.totals.items.reduce(
        (total, item) => total + item.Quantity,
        0,
      ),
  );

const makeSelectCart = () =>
  createSelector(
    selectApp,
    state => state.cartData.totals,
  );

const makeSelectCartItems = () =>
  createSelector(
    makeSelectCacheItems(),
    makeSelectCart(),
    (cacheItems, totals) =>
      totals.items.map(item => {
        // const cacheItem = cacheItems[item.ProductId];
        // if (cacheItem) {
        //   item.ProductName = cacheItem.Name;
        //   item.Images = cacheItem.Images;
        //   item.ProductPrice = cacheItem.Price;
        //   item.PromotionPrice = cacheItem.PromotionPrice;
        // }
        return item;
      }),
  );

const makeSelectTotalPrice = () =>
  createSelector(
    makeSelectCartItems(),
    items =>
      items.reduce(
        (totalPrice, item) =>
          totalPrice +
          (item.PromotionPrice || item.ProductPrice) * item.Quantity,
        0,
      ),
  );

const makeSelectLocationModalState = () =>
  createSelector(
    selectApp,
    state => state.locationModalState,
  );

const makeSelectSite = () =>
  createSelector(
    selectApp,
    state => state.site,
  );

const makeSelectCacheItems = () =>
  createSelector(
    selectApp,
    state => state.cacheItems,
  );

const makeSelectProvinces = () =>
  createSelector(
    selectApp,
    state => state.ProvinceData,
  );

export {
  makeSelectLocation,
  makeSelectBreadcrumb,
  makeSelectUserLocation,
  makeSelectScreenSize,
  makeSelectLogo,
  makeSelectSearchPlaceholder,
  makeSelectCategories,
  makeSelectCartNumber,
  makeSelectCart,
  makeSelectLocationModalState,
  makeSelectSite,
  makeSelectCacheItems,
  makeSelectTotalPrice,
  makeSelectCartItems,
  makeSelectProvinces,
  makeSelectUserLocationObject,
};
