export interface Pokemon {
  id: number;
  name: string;
  type1: string;
  type2?: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  generation: number;
  legendary: boolean;
  image?: string;
  isFavorite?: boolean;
  ytbUrl: string;
}

export interface PokemonListResponse {
  data: Pokemon[];
  total: number;
  page: number;
  limit: number;
}

export interface PokemonListParams {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  legendary?: boolean;
  speedMin?: number;
  speedMax?: number;
}
