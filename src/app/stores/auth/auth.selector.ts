import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import { RootState } from "../app.state";

export const selectAuthenticatedState = createFeatureSelector<RootState>('authenticated');

export const selectAuthenticated = createSelector(
  selectAuthenticatedState,
  state => {
   return  state.authenticated
  }
);

export const selectProfile = createSelector(
  selectAuthenticatedState,
  state => {
    return  state.profile
  }
);

