import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonDetailModalComponent } from './components/pokemon-detail-modal/pokemon-detail-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PokemonDetailModalComponent,
  ],
})
export class AppComponent {
  hasAuthenticated = true;
}
