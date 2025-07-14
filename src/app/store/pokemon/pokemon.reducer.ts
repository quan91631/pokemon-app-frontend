import { createReducer, on } from '@ngrx/store';
import { initialPokemonState } from './pokemon.state';
import * as PokemonActions from './pokemon.actions';

export const pokemonReducer = createReducer(
  initialPokemonState,
  on(
    PokemonActions.loadPokemons,
    PokemonActions.loadHomePokemons,
    PokemonActions.importCsv,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(PokemonActions.loadPokemonsSuccess, (state, { response }) => ({
    ...state,
    pokemons: response.data,
    total: response.total,
    page: response.page,
    limit: response.limit,
    loading: false,
    error: null,
  })),
  on(PokemonActions.loadHomePokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    homePokemons: pokemons,
    loading: false,
    error: null,
  })),
  on(
    PokemonActions.loadPokemonsFailure,
    PokemonActions.loadHomePokemonsFailure,
    PokemonActions.importCsvFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(PokemonActions.selectPokemon, (state, { pokemon }) => ({
    ...state,
    selectedPokemon: pokemon,
  })),
  on(PokemonActions.toggleFavoriteSuccess, (state, { pokemonId }) => ({
    ...state,
    pokemons: state.pokemons.map((p) =>
      p.id === pokemonId ? { ...p, isFavorite: !p.isFavorite } : p
    ),
    homePokemons: state.homePokemons.map((p) =>
      p.id === pokemonId ? { ...p, isFavorite: !p.isFavorite } : p
    ),
  })),
  on(PokemonActions.importCsvSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(PokemonActions.clearSelectedPokemon, (state) => ({
    ...state,
    selectedPokemon: null,
  }))
);
