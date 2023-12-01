import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import {itemsReducer} from "./stores/items";
import {authenticatedReducer} from "./stores/auth/auth.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ items: itemsReducer, authenticated: authenticatedReducer }),
    provideStoreDevtools(
      {
        maxAge: 25, logOnly: !isDevMode()
      }),
    provideEffects(),

  ]
};
