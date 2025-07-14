import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PokemonFilters,
  PokemonListResponse,
  Pokemon,
} from 'src/app/types/pokemon';
import { ENVIRONMENT } from 'src/app/providers/enviroment/enviroment.provider';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  env = inject(ENVIRONMENT);

  getPokemonList(
    page: number = 1,
    limit: number = 20,
    filters?: PokemonFilters
  ): Observable<PokemonListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      if (filters.name) params = params.set('name', filters.name);
      if (filters.type) params = params.set('type', filters.type);
      if (filters.legendary !== undefined)
        params = params.set('legendary', filters.legendary.toString());
      if (filters.speedMin)
        params = params.set('minSpeed', filters.speedMin.toString());
      if (filters.speedMax)
        params = params.set('maxSpeed', filters.speedMax.toString());
    }

    return this.http.get<PokemonListResponse>(this.env.server + '/pokemon', {
      params,
    });
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.env.server + `/pokemon/${id}`);
  }

  getHomePokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`this.env.server/pokemon/home`);
  }

  importPokemonCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.env.server + '/pokemon/import', formData);
  }

  addToFavorites(pokemonId: number): Observable<void> {
    return this.http.post<void>(
      this.env.server + `/pokemon/${pokemonId}/favorite`,
      {}
    );
  }

  removeFromFavorites(pokemonId: number): Observable<void> {
    return this.http.delete<void>(
      this.env.server + `/pokemon/${pokemonId}/favorite`
    );
  }

  getFavorites(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.env.server + '/pokemon/favorites');
  }
}
