import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import * as PokemonActions from '../actions/pokemon.actions';

@Injectable()
export class PokemonEffects {
  loadPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonList),
      switchMap(({ page, limit, filters }) =>
        this.pokemonService.getPokemonList(page, limit, filters).pipe(
          map((response) =>
            PokemonActions.loadPokemonListSuccess({ response })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonListFailure({ error }))
          )
        )
      )
    )
  );

  loadPokemonDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonDetail),
      switchMap(({ id }) =>
        this.pokemonService.getPokemonById(id).pipe(
          map((pokemon) =>
            PokemonActions.loadPokemonDetailSuccess({ pokemon })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonListFailure({ error }))
          )
        )
      )
    )
  );

  loadHomePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadHomePokemon),
      switchMap(() =>
        this.pokemonService.getHomePokemon().pipe(
          map((pokemon) => PokemonActions.loadHomePokemonSuccess({ pokemon })),
          catchError((error) =>
            of(PokemonActions.loadPokemonListFailure({ error }))
          )
        )
      )
    )
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.toggleFavorite),
      mergeMap(({ pokemonId }) =>
        this.pokemonService.addToFavorites(pokemonId).pipe(
          map(() =>
            PokemonActions.toggleFavoriteSuccess({
              pokemonId,
              isFavorite: true,
            })
          ),
          catchError(() =>
            this.pokemonService
              .removeFromFavorites(pokemonId)
              .pipe(
                map(() =>
                  PokemonActions.toggleFavoriteSuccess({
                    pokemonId,
                    isFavorite: false,
                  })
                )
              )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
