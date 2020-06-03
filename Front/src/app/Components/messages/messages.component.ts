import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
