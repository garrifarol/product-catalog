import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private snackBar = inject<MatSnackBar>(MatSnackBar);

  open(message: string, action = 'OK') {
    this._open(message, action);
  }

  private _open(message: string, action: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.snackBar.open(message, action, config);
  }
}
