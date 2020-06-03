import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/login';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Checkin } from '../Models/checkin';

const apiBase = environment.apiBase;
const login = environment.login;
const usuario = environment.usuario;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(credentials: Login) {
    return this.http.post(`${apiBase}${login}`, credentials);
  }
  registrarse(user: Checkin) {
    return this.http.post(`${apiBase}${usuario}`, user);
  }
  getUserLoged() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    localStorage.removeItem('token' );
    localStorage.removeItem('user' );
    localStorage.removeItem('languague' );

    this.router.navigate(['login']);
  }
}


