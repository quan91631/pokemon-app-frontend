import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/types/pokemon';
import { selectSelectedPokemon } from 'src/app/store/pokemon/pokemon.selectors';
import { clearSelectedPokemon } from 'src/app/store/pokemon/pokemon.actions';

@Component({
  selector: 'app-pokemon-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-modal.component.html',
})
export class PokemonDetailModalComponent {
  pokemon$: Observable<Pokemon | null>;
  showModal = false;

  constructor(private store: Store) {
    this.pokemon$ = this.store.select(selectSelectedPokemon);
    this.pokemon$.subscribe((pokemon) => {
      this.showModal = !!pokemon;
    });
  }

  closeModal() {
    this.showModal = false;
    this.store.dispatch(clearSelectedPokemon());
  }
}
