import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private MatDialog:MatDialog) { }
  openConfirmDialog(msg) {
    return this.MatDialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: "confirm-dialog-container",
      disableClose: true,
      position: { top: "10px;" },
      data: { message: msg }
    });
  }
}
