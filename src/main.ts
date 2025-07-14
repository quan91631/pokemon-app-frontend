import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_ROUTES } from './app/app.route';
import { provideEnvironment } from './app/providers/enviroment/enviroment.provider';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideEnvironment(),
    provideHttpClient(withInterceptors([])),
  ],
}).catch((err) => console.error(err));
