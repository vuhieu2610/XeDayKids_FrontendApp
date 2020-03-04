import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location
  );

const selectApp = state => state.app;

const makeSelectBreadcrumb = () =>
  createSelector(
    selectApp,
    state => state.breadcrumbs
  );

const makeSelectUserLocation = () =>
  createSelector(
    selectApp,
    state => state.location
  );

const makeSelectScreenSize = () =>
  createSelector(
    selectApp,
    state => state.screenWidth
  );

export {
  makeSelectLocation,
  makeSelectBreadcrumb,
  makeSelectUserLocation,
  makeSelectScreenSize
};
