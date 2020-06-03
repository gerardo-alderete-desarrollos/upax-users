import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiBase = environment.apiBase;
const usuario = environment.usuario;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(
    private http: HttpClient
  ) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
  }
  getUsers() {
    return this.http.get(`${apiBase}${usuario}`, {headers: this.getHeaders()});
  }

  editUser(user, id) {
    return this.http.put(`${apiBase}${usuario}/${id}`, user ,{headers : this.getHeaders()});
  }
}
