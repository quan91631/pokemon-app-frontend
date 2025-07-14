import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from '../actions/pokemon.actions';
import { Pokemon, PokemonFilters } from 'src/app/types/pokemon';

export interface PokemonState {
  pokemonList: Pokemon[];
  homePokemon: Pokemon[];
  selectedPokemon: Pokemon | null;
  filters: PokemonFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  pokemonList: [],
  homePokemon: [],
  selectedPokemon: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemonList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PokemonActions.loadPokemonListSuccess, (state, { response }) => ({
    ...state,
    pokemonList: response.data,
    pagination: {
      page: response.page,
      limit: response.limit,
      total: response.total,
    },
    loading: false,
  })),
  on(PokemonActions.loadPokemonListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PokemonActions.loadHomePokemonSuccess, (state, { pokemon }) => ({
    ...state,
    homePokemon: pokemon,
  })),
  on(PokemonActions.loadPokemonDetailSuccess, (state, { pokemon }) => ({
    ...state,
    selectedPokemon: pokemon,
  })),
  on(
    PokemonActions.toggleFavoriteSuccess,
    (state, { pokemonId, isFavorite }) => ({
      ...state,
      pokemonList: state.pokemonList.map((p) =>
        p.id === pokemonId ? { ...p, isFavorite } : p
      ),
      selectedPokemon:
        state.selectedPokemon?.id === pokemonId
          ? { ...state.selectedPokemon, isFavorite }
          : state.selectedPokemon,
    })
  ),
  on(PokemonActions.setFilters, (state, { filters }) => ({
    ...state,
    filters,
  })),
  on(PokemonActions.setPagination, (state, { page, limit }) => ({
    ...state,
    pagination: { ...state.pagination, page, limit },
  }))
);
