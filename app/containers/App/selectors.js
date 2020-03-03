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

export { makeSelectLocation, makeSelectBreadcrumb, makeSelectUserLocation };
