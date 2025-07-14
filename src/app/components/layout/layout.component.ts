import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
})
export class LayoutComponent {}
