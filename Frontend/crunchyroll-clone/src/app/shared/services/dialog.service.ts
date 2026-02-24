import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialog, ConfirmationDialogData} from '../components/confirmation-dialog/confirmation-dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  confirm(data: ConfirmationDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmationDialog, {
      data,
      width: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false
    }).afterClosed();
  }
}
