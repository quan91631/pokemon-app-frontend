import { createAction, props } from '@ngrx/store';
import {
  PokemonListResponse,
  Pokemon,
  PokemonListParams,
} from 'src/app/types/pokemon';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons',
  props<{ params: PokemonListParams }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ response: PokemonListResponse }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: string }>()
);

export const loadHomePokemons = createAction('[Pokemon] Load Home Pokemons');

export const loadHomePokemonsSuccess = createAction(
  '[Pokemon] Load Home Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadHomePokemonsFailure = createAction(
  '[Pokemon] Load Home Pokemons Failure',
  props<{ error: string }>()
);

export const selectPokemon = createAction(
  '[Pokemon] Select Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const toggleFavorite = createAction(
  '[Pokemon] Toggle Favorite',
  props<{ pokemonId: number }>()
);

export const toggleFavoriteSuccess = createAction(
  '[Pokemon] Toggle Favorite Success',
  props<{ pokemonId: number }>()
);

export const importCsv = createAction(
  '[Pokemon] Import CSV',
  props<{ file: File }>()
);

export const importCsvSuccess = createAction('[Pokemon] Import CSV Success');

export const importCsvFailure = createAction(
  '[Pokemon] Import CSV Failure',
  props<{ error: string }>()
);

export const clearSelectedPokemon = createAction(
  '[Pokemon] Clear Selected Pokemon'
);
