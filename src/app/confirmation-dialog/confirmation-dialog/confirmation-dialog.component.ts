import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() btnOkText!: string;
  @Input() btnCancelText!: string;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onDecline = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: 'Delete Patient',
    message: 'Are you sure you want to delete this patient?',
    btnOkText: 'Delete',
    btnCancelText: 'Cancel'
  }) { 
    this.title = data.title
    this.message = data.message
    this.btnOkText = data.btnOkText
    this.btnCancelText = data.btnCancelText
  }

  confirm() {
    this.onConfirm.emit()
  }

  decline() {
    console.log('clickeed')
    this.onDecline.emit()
  }
}
