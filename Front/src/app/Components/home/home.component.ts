import { Component, OnInit } from '@angular/core';
import { LanguagueService } from '../../Services/languague.service';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { MessagesService } from '../../Services/messages.service';
import { Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  languagueGlobal: any;
  languagues = [];
  userLoged;
  usuarios;
  userSelect: any;
  usuariosActivos: any;
  usuariosInactivos: any;
  constructor(
    private languagueService: LanguagueService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private messagesService: MessagesService,
    private router: Router,
    private usersService: UsersService
  ) { 
    // subscripción para detectar cambio de lenguague
    this.languagueService.changeLanguague.subscribe(
      data => {
        this.languagueGlobal = this.languagueService.getLanguague().global;
        this.languagues = this.languagueGlobal.languages;
      }
    );
  }

  ngOnInit() {
    this.languagueGlobal = this.languagueService.getLanguague().global;
    this.languagues = this.languagueGlobal.languages;
    this.userLoged = this.loginService.getUserLoged();
    this.getUsers();
  }
  changeLanguague(languague) {
    this.languagueService.changeLanguagueFunction(languague);
  }
  logout() {
    this.loginService.logout()
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      (data:any) => {
         this.usuarios = data.usuarios;
         this.usuariosActivos = this.usuarios.filter( u => u.isActive );
         this.usuariosInactivos = this.usuarios.filter( u => !u.isActive );

         this.userSelect = this.usuariosActivos[0];
      },
      error => {
        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'error', message: error.error.mensaje }
        });
      }
    );
  }

  userEmit( userEmit ) {
    this.userSelect = userEmit;
  }

  usuarioEditado( userEdit ) {
    if( userEdit.isActive ) {
      const index = this.usuariosActivos.findIndex( u => u._id === userEdit._id);
      this.usuariosActivos.splice( index, 1 , userEdit );
    }else {
      
      const index2 = this.usuariosActivos.findIndex( u => u._id === userEdit._id);
      this.usuariosInactivos.push(userEdit);
      this.usuariosActivos.splice( index2, 1 );
      this.userSelect = this.usuariosActivos[0];

    }
  }

  userReactiveEmit( userReactive ) {
    if( userReactive.isActive ) {
      const index2 = this.usuariosInactivos.findIndex( u => u._id === userReactive._id);
      this.usuariosInactivos.splice( index2, 1 );
      this.usuariosActivos.push(userReactive);
      this.userSelect = this.usuariosActivos[0];

    }
  }
}
 