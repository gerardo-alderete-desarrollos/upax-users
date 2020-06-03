import { NgModule } from '@angular/core';

//COMPONENTES ANGULAR MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
