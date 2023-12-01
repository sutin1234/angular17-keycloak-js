import { createAction, props } from '@ngrx/store';

export const authKey = '[Item]'
export const setAuthenticated = createAction(`${authKey} Set Authenticated`, props<{ authenticated: boolean }>());
export const setProfile = createAction(`${authKey} Set Profile`, props<{ profile: any }>());
