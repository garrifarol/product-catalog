import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../models/confirm-dialog.model';
import { ConfirmDialog as ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialog {
  private dialog = inject(MatDialog);

  confirm(data: ConfirmDialogData) {
    return this.dialog
      .open(ConfirmDialogComponent, {
        width: '360px',
        disableClose: true,
        data,
      })
      .afterClosed();
  }
}
