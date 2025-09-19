import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  @Output() openChange = new EventEmitter<boolean>();

  closeModal() {
   if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }
}
