import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//MODULO DE ANGULAR MATERIAL
import { MaterialModule } from './material.module';

//COMPONENTES
import { LoginComponent } from './Components/login/login.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { HomeComponent } from './Components/home/home.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { ProfileComponent } from './Components/profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    HomeComponent,
    UsersListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MessagesComponent
  ]
})
export class AppModule { }
