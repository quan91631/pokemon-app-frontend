import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import * as PokemonActions from './pokemon.actions';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap((action) =>
        this.pokemonService.getPokemons(action.params).pipe(
          map((response) => PokemonActions.loadPokemonsSuccess({ response })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadHomePokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadHomePokemons),
      switchMap(() =>
        this.pokemonService.getPokemons({ page: 1, limit: 10 }).pipe(
          map((response) =>
            PokemonActions.loadHomePokemonsSuccess({ pokemons: response.data })
          ),
          catchError((error) =>
            of(PokemonActions.loadHomePokemonsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.toggleFavorite),
      exhaustMap((action) =>
        this.pokemonService.toggleFavorite(action.pokemonId).pipe(
          map(() =>
            PokemonActions.toggleFavoriteSuccess({
              pokemonId: action.pokemonId,
            })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  importCsv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.importCsv),
      exhaustMap((action) =>
        this.pokemonService.importPokemonCsv(action.file).pipe(
          map(() => PokemonActions.importCsvSuccess()),
          catchError((error) =>
            of(PokemonActions.importCsvFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
