import { createAction, props } from '@ngrx/store';

export const itemKey = '[Item]'
export const addItem = createAction(`${itemKey} Add Item`, props<{ item: string }>());
