import { createReducer, on } from '@ngrx/store';
import { addItem } from './items.action';
import {RootState} from "../app.state";


export const initialState: { items: string[] } = {
  items: []
};

export const itemsReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => {
    return { ...state, items: [...state.items, item] };
  })
);
