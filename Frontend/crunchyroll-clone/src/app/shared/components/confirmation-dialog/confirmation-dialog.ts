import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButton
  ],
  template: `
    <div class="dialog-container">
      <h2 class="dialog-title">{{ data.title }}</h2>
      <p class="dialog-message">{{ data.message }}</p>
      <div class="dialog-actions">
        <button mat-stroked-button class="cancel-btn" (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-flat-button class="confirm-btn" (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .dialog-container {
      background-color: #23252b;
      color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #3c3f46;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
      font-family: 'Lato', 'Helvetica Neue', sans-serif;
      min-width: 320px;
      max-width: 480px;
    }

    .dialog-title {
      margin: 0 0 16px 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #f47521;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dialog-message {
      margin: 0 0 32px 0;
      font-size: 1rem;
      line-height: 1.5;
      color: #dadada;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .confirm-btn {
      background-color: #f47521 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      padding: 0 24px !important;
      height: 40px !important;
      border-radius: 4px !important;
      font-family: 'Lato', 'Helvetica Neue', sans-serif !important;
    }

    .confirm-btn:hover {
      background-color: #ff8a40 !important;
    }

    .cancel-btn {
      border-color: #555 !important;
      color: #a0a0a0 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      padding: 0 24px !important;
      height: 40px !important;
      border-radius: 4px !important;
      font-family: 'Lato', 'Helvetica Neue', sans-serif !important;
    }

    .cancel-btn:hover {
      color: #ffffff !important;
      border-color: #ffffff !important;
      background-color: transparent !important;
    }
  `]
})
export class ConfirmationDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);
  readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
