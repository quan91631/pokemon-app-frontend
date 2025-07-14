import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PokemonListResponse,
  Pokemon,
  PokemonListParams,
} from 'src/app/types/pokemon';
import { ENVIRONMENT } from 'src/app/providers/enviroment/enviroment.provider';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  env = inject(ENVIRONMENT);
  http = inject(HttpClient);

  getPokemons(params: PokemonListParams): Observable<PokemonListResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('limit', params.limit.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params.legendary !== undefined) {
      httpParams = httpParams.set('legendary', params.legendary.toString());
    }
    if (params.speedMin !== undefined) {
      httpParams = httpParams.set('speedMin', params.speedMin.toString());
    }
    if (params.speedMax !== undefined) {
      httpParams = httpParams.set('speedMax', params.speedMax.toString());
    }
    return this.http.get<PokemonListResponse>(this.env.server + '/pokemon', {
      params: httpParams,
    });
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.env.server + '/pokemon/' + id);
  }

  importPokemonCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.env.server + '/pokemon/import/', formData);
  }

  toggleFavorite(pokemonId: number): Observable<any> {
    return this.http.post(
      this.env.server + `/pokemon/${pokemonId}/favorite`,
      {}
    );
  }

  getFavorites(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.env.server + '/pokemon/favorites');
  }
}
