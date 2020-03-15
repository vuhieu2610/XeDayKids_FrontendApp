import { createSelector } from 'reselect';

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
    state => state.cart.legnth || 0,
  );

const makeSelectCart = () =>
  createSelector(
    selectApp,
    state => state.cart || [],
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
};
