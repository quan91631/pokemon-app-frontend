import { createAction, props } from '@ngrx/store';
import {
  PokemonFilters,
  PokemonListResponse,
  Pokemon,
} from 'src/app/types/pokemon';

export const loadPokemonList = createAction(
  '[Pokemon] Load Pokemon List',
  props<{ page: number; limit: number; filters?: PokemonFilters }>()
);

export const loadPokemonListSuccess = createAction(
  '[Pokemon] Load Pokemon List Success',
  props<{ response: PokemonListResponse }>()
);

export const loadPokemonListFailure = createAction(
  '[Pokemon] Load Pokemon List Failure',
  props<{ error: any }>()
);

export const loadPokemonDetail = createAction(
  '[Pokemon] Load Pokemon Detail',
  props<{ id: number }>()
);

export const loadPokemonDetailSuccess = createAction(
  '[Pokemon] Load Pokemon Detail Success',
  props<{ pokemon: Pokemon }>()
);

export const loadHomePokemon = createAction('[Pokemon] Load Home Pokemon');

export const loadHomePokemonSuccess = createAction(
  '[Pokemon] Load Home Pokemon Success',
  props<{ pokemon: Pokemon[] }>()
);

export const toggleFavorite = createAction(
  '[Pokemon] Toggle Favorite',
  props<{ pokemonId: number }>()
);

export const toggleFavoriteSuccess = createAction(
  '[Pokemon] Toggle Favorite Success',
  props<{ pokemonId: number; isFavorite: boolean }>()
);

export const setFilters = createAction(
  '[Pokemon] Set Filters',
  props<{ filters: PokemonFilters }>()
);

export const setPagination = createAction(
  '[Pokemon] Set Pagination',
  props<{ page: number; limit: number }>()
);
