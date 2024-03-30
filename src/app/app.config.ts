import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SearchEffects } from './store/effects/search.effects';
import { searchReducer } from './store/reducers/search.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FormsModule,
    BrowserModule,
    provideStore({ search: searchReducer }),
    provideEffects([SearchEffects]),
    provideHttpClient(withInterceptors([errorInterceptor])),
  ]
};
