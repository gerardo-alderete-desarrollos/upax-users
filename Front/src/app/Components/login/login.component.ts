import { Component, OnInit } from '@angular/core';
import { LanguagueService } from '../../Services/languague.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Login } from 'src/app/Models/login';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../../Services/messages.service';
import { Router } from '@angular/router';
import { Checkin } from '../../Models/checkin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  languagueGlobal: any;
  languagues = [];
  hide = true;
  formLogin: FormGroup;
  formCheckin: FormGroup;
  isLogin = true;
  durationInSeconds = environment.config.durationInSeconds;

  constructor(
    private languagueService: LanguagueService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private messagesService: MessagesService,
    private router: Router
  ) {

    // subscripción para detectar cambio de lenguague
    this.languagueService.changeLanguague.subscribe(
      data => {
        this.languagueGlobal = this.languagueService.getLanguague().global;
        this.languagues = this.languagueGlobal.languages;
      }
    );
  }

  ngOnInit(): void {
    this.languagueGlobal = this.languagueService.getLanguague().global;
    this.languagues = this.languagueGlobal.languages;

    this.formLogin = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.formCheckin = this.fb.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  changeLanguague(languague) {
    this.languagueService.changeLanguagueFunction(languague);

  }

  changeLoginCheckin(isLogin) {
    this.isLogin = isLogin;

    if( isLogin ) {
      this.formCheckin.reset();
    } else {
      this.formLogin.reset();
    }
  }

  login() {
    let credentials : Login = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    };
    this.loginService.login(credentials).subscribe(
      (data:any) => { 
        localStorage.setItem('token', data.token );
        localStorage.setItem('user', JSON.stringify(data.usuario) );
        this.router.navigate(['home']);
      },
      error => {
        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'error', message: error.error.mensaje } 
        });
      }
    );
  }
  checkin() {
    let user : Checkin = {
      nombre: this.formCheckin.get('user').value,
      email: this.formCheckin.get('email').value,
      password: this.formCheckin.get('password').value,
    
    };
    this.loginService.registrarse(user).subscribe(
      (data:any) => {
        this.isLogin = true;
        this.formLogin.patchValue( {
          email: data.usuario.email,
          password: data.usuario.password
        })
        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'error', message: data.message }
        });
        this.formCheckin.reset();
      },
      error => {
        this.messagesService.openSnackBar( { 
          durationInSeconds: 5,
          data:  { type : 'error', message: error.error.mensaje } 
        });
      }
    );
  }

}
