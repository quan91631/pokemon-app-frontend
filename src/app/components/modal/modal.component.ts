import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  standalone: true,
  imports: [NgIf],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  closeModal(): void {
    this.closeEvent.emit();
  }
}
