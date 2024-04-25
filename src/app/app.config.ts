import { provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ApplicationConfig, enableProdMode, importProvidersFrom} from "@angular/core";
import {routes} from "./app.routes";
import {AuthInterceptor} from "./service/AuthInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  ]
};
