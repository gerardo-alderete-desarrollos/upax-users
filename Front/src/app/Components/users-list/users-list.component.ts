import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguagueService } from '../../Services/languague.service';
import { MessagesService } from '../../Services/messages.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() color;
  @Input() title;
  @Input() usuarios;
  @Input() right;
  @Input() activeUser;
  @Output() userSelected = new EventEmitter();
  @Output() usuarioReactive = new EventEmitter();
  languagueGlobal: any;
  languagues = [];
  position = new FormControl('below');
  durationInSeconds = environment.config.durationInSeconds;


  constructor(
    private languagueService: LanguagueService,
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
  }

  userSelectedMethod(user) {
    this.userSelected.emit(user);
  }

  reactiveUser(usuario: any) {
    if( usuario ) {
      usuario.isActive = true
      this.usersService.editUser(usuario, usuario._id).subscribe(
        (data:any) => {
  
          this.messagesService.openSnackBar( { 
            durationInSeconds: 5,
            data:  { type : 'success', message: `Usuario ${data.usuario.nombre} reactivado correctamente` }
          });
          this.usuarioReactive.emit(data.usuario);
        },
        error => {
          this.messagesService.openSnackBar( { 
            durationInSeconds: 5,
            data:  { type : 'error', message: `${error.error.mensaje}` }
          });
        }
      );
    }else {
      this.messagesService.openSnackBar( { 
        durationInSeconds: 5,
        data:  { type : 'success', message: `${this.languagueGlobal.dontUserDelete}` }
      });
    }
    
  }

}
