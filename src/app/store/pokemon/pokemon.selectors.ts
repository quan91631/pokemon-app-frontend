import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.state';

export const selectPokemonState =
  createFeatureSelector<PokemonState>('pokemon');

export const selectPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemons
);

export const selectHomePokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.homePokemons
);

export const selectSelectedPokemon = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.selectedPokemon
);

export const selectPokemonLoading = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.loading
);

export const selectPokemonError = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.error
);

export const selectPokemonPagination = createSelector(
  selectPokemonState,
  (state: PokemonState) => ({
    total: state.total,
    page: state.page,
    limit: state.limit,
  })
);
