import { createReducer, on } from '@ngrx/store';
import {RootState} from "../app.state";
import {setAuthenticated, setProfile} from "./auth.action";


export const initialState: Record<string, any> = {
  authenticated: false,
  profile: {}
};

export const authenticatedReducer = createReducer(
  initialState,
  on(setAuthenticated, (state, { authenticated }) => {
    return { ...state, authenticated: authenticated };
  }),
  on(setProfile, (state, { profile }) => {
    return { ...state, profile: profile };
  })
);
