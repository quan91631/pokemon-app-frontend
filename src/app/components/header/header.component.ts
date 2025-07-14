import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/auth.selector';
import { logout } from 'src/app/store/auth/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
