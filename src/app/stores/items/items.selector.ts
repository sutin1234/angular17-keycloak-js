import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from "../app.state";

export const selectItemState = createFeatureSelector<RootState>('items');

export const selectItems = createSelector(
  selectItemState,
  state => state.items
);
