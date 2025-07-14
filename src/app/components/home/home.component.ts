import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectHomePokemons,
  selectPokemonLoading,
} from '../../store/pokemon/pokemon.selectors';
import {
  loadHomePokemons,
  selectPokemon,
  toggleFavorite,
} from '../../store/pokemon/pokemon.actions';
import { Pokemon } from 'src/app/types/pokemon';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { LoadingSpinnerComponent } from '../spinner/spinner.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    PokemonCardComponent,
    LoadingSpinnerComponent,
    // PokemonDetailModalComponent
  ],
})
export class HomeComponent implements OnInit {
  homePokemons$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  featuredVideos: { title: string; embedUrl: SafeResourceUrl }[] = [];

  constructor(private store: Store, private sanitizer: DomSanitizer) {
    this.homePokemons$ = this.store.select(selectHomePokemons);
    this.loading$ = this.store.select(selectPokemonLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadHomePokemons());

    this.homePokemons$.subscribe((pokemons) => {
      if (pokemons && pokemons.length >= 4) {
        this.featuredVideos = pokemons.slice(0, 4).map((pokemon) => ({
          title: pokemon.name + ' Trailer',
          embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
            this.getEmbedUrl(pokemon.ytbUrl)
          ),
        }));
      }
    });
  }

  onPokemonClick(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon({ pokemon }));
  }

  onFavoriteClick(pokemonId: number): void {
    this.store.dispatch(toggleFavorite({ pokemonId }));
  }

  private getEmbedUrl(ytbUrl: string): string {
    // Extract video ID from ytbUrl
    const match = ytbUrl.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : '';
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
