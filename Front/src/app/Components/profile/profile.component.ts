import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from '../../Services/messages.service';
import { UsersService } from '../../Services/users.service';
import { LanguagueService } from '../../Services/languague.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input() color;
  @Input() title;
  @Input() usuario;
  @Input() right;
  @Output() usuarioEditado = new EventEmitter();
  formCheckin: FormGroup;
  position = new FormControl('below');

  languagueGlobal: any;
  languagues = [];
  hide = true;
  durationInSeconds = environment.config.durationInSeconds;
  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private userService: UsersService,
    private languagueService: LanguagueService,
    private router: Router

  ) { 
     // subscripción para detectar cambio de lenguague
     this.languagueService.changeLanguague.subscribe(
      data => {
        debugger
        this.languagueGlobal = this.languagueService.getLanguague().global;
        this.languagues = this.languagueGlobal.languages;
      }
    );
    debugger

    this.formCheckin = this.fb.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    debugger
    this.languagueGlobal = this.languagueService.getLanguague().global;
    this.languagues = this.languagueGlobal.languages;
    
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    debugger
    if( this.usuario ) {
      this.formCheckin = this.fb.group({
        user: new FormControl(this.usuario.nombre, Validators.required),
        password: new FormControl(this.usuario.password, Validators.required),
        email: new FormControl(this.usuario.email, Validators.required),
      });
    }
  }
  edit() {
    debugger
    let user  = {
      nombre: this.formCheckin.get('user').value,
      email: this.formCheckin.get('email').value,
      password: this.formCheckin.get('password').value,
      isActive: true
    };
    debugger
    this.userService.editUser(user, this.usuario._id).subscribe(
      (data:any) => {
        debugger

        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'success', message: `${data.mensaje} ${data.usuario.nombre}` }
        });
        //this.formCheckin.reset();
        this.usuarioEditado.emit(data.usuario);
      },
      error => {
        debugger
        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'error', message: `${error.error.mensaje}` } 
        });
      }
    );
  }
  deleteUser() {
    if( this.usuario ) {
      let user  = {
        isActive: false
      };
      debugger
      this.userService.editUser(user, this.usuario._id).subscribe(
        (data:any) => {
          debugger
  
          this.messagesService.openSnackBar( { 
            durationInSeconds: 5,
            data:  { type : 'success', message: `Usuario ${data.usuario.nombre} eliminado correctamente` }
          });
          this.formCheckin.reset();
          this.usuarioEditado.emit(data.usuario);
        },
        error => {
          debugger
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
