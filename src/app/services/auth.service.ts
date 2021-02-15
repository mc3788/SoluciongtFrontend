import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../interface/bo/Usuario';
import {environment} from '../../environments/environment';
import {Acceso} from '../interface/bo/Acceso';

const backendUrl = environment.backendAuth;

@Injectable()
export class AuthService {

  token: string;
  userId: string;
  AuthSecurity: boolean;
  user: Usuario;
  logged = false;
  
  public accesos: Acceso[];

  constructor(public http: HttpClient) {
  }
  // Logeo de usuario por post
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post( backendUrl + 'login', {usuario: username, password: password}, {headers: headers});
  }

  // Carga accesos por nombre de usuario
  loadAccess( ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.token
    });
    return new Promise<void>( (resolve, reject) => {
      try {
        this.http.get( backendUrl + 'usuario/permissions/' + this.userId, {headers: headers})
          .subscribe( data => {
            this.accesos = <Acceso[]>data;
            resolve();
          }, error => {
            reject();
          } );
      } catch (e) {
        reject();
      }
    });
  }

  saveSession() {
    return new Promise<void>((resolve, reject) => {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.userId);
        this.logged = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.logged = false;
      }
      resolve();
    });
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.AuthSecurity = false;
    this.logged = false;
    this.saveSession();

  }

  async loadSession() {
    return new Promise<void>((resolve, reject) => {
        this.token = localStorage.getItem('token');
        this.userId = localStorage.getItem('user');
        resolve();
    });
  }

}
