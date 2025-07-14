import { Pokemon } from 'src/app/types/pokemon';

export interface PokemonState {
  pokemons: Pokemon[];
  homePokemons: Pokemon[];
  favorites: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

export const initialPokemonState: PokemonState = {
  pokemons: [],
  homePokemons: [],
  favorites: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 20,
};
