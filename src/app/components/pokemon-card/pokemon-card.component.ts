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

  getPokemonImage(): string {
    return (
      this.pokemon.image ||
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
    );
  }

  onImageError(event: any): void {
    event.target.src = 'assets/pokemon-placeholder.png';
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      Fire: '#ff6b6b',
      Water: '#4ecdc4',
      Grass: '#51cf66',
      Electric: '#ffd43b',
      Psychic: '#d63384',
      Ice: '#4dabf7',
      Fighting: '#d63384',
      Poison: '#9775fa',
      Ground: '#fab005',
      Flying: '#748ffc',
      Bug: '#8ce99a',
      Rock: '#a61e4d',
      Ghost: '#6741d9',
      Dragon: '#3b82f6',
      Dark: '#495057',
      Steel: '#868e96',
      Fairy: '#f783ac',
    };
    return colors[type] || '#6c757d';
  }
}
