import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePage = state => state.homePage || initialState;

export const makeSelectHomeState = () =>
  createSelector(
    selectHomePage,
    state => state
  );
