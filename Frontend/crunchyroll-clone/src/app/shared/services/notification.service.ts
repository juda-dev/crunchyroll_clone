import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly snackBar = inject(MatSnackBar);

  success(message: string, duration: number = 4000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['notification-success']
    });
  }

  error(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['notification-error']
    });
  }
}
