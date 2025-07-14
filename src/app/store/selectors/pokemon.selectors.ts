import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from '../reducers/pokemon.reducer';

export const selectPokemonState =
  createFeatureSelector<PokemonState>('pokemon');

export const selectPokemonList = createSelector(
  selectPokemonState,
  (state) => state.pokemonList
);

export const selectHomePokemon = createSelector(
  selectPokemonState,
  (state) => state.homePokemon
);

export const selectSelectedPokemon = createSelector(
  selectPokemonState,
  (state) => state.selectedPokemon
);

export const selectPokemonFilters = createSelector(
  selectPokemonState,
  (state) => state.filters
);

export const selectPokemonPagination = createSelector(
  selectPokemonState,
  (state) => state.pagination
);

export const selectPokemonLoading = createSelector(
  selectPokemonState,
  (state) => state.loading
);
