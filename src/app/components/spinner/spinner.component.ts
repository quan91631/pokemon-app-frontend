import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center items-center" [class]="containerClass">
      <div
        class="animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
        [class]="spinnerClass"
      ></div>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() containerClass = 'py-8';

  get spinnerClass(): string {
    const sizes = {
      small: 'h-6 w-6',
      medium: 'h-12 w-12',
      large: 'h-16 w-16',
    };
    return sizes[this.size];
  }
}
