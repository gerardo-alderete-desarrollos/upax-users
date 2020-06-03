import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessagesComponent } from '../Components/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(config) {
    this._snackBar.openFromComponent(MessagesComponent, {
      duration: config.durationInSeconds * 1000,
      data: config.data
    });
  }
}
