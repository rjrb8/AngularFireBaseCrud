import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private SnackBar: MatSnackBar) { }
  
  config:MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: "right",
    verticalPosition: "top"
  }

  sucess(msg) {
    this.config['panelClass'] = ['notifition', 'sucess'];
    this.SnackBar.open(msg, '', this.config);
  }
}
