import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: 'pokemon-card.component.html',
  standalone: true,
  imports: [NgIf],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() cardClick = new EventEmitter<Pokemon>();
  @Output() favoriteClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.pokemon);
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteClick.emit(this.pokemon.id);
  }
}
