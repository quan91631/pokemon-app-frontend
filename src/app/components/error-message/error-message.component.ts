import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <strong class="font-bold">Error: </strong>
      <span>{{ message }}</span>
    </div>
  `,
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
