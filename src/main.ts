import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEnvironment } from './app/providers/enviroment/enviroment.provider';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app.route';
import { authReducer } from './app/store/auth/auth.reducer';
import { pokemonReducer } from './app/store/pokemon/pokemon.reducer';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/store/auth/auth.effects';
import { PokemonEffects } from './app/store/pokemon/pokemon.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideAnimations(),
    provideEnvironment(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      pokemon: pokemonReducer,
      auth: authReducer,
    }),
    provideEffects([AuthEffects, PokemonEffects]),
  ],
}).catch((err) => console.error(err));
