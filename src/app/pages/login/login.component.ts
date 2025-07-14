import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  standalone: true,
  imports: [MatCardModule,],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
