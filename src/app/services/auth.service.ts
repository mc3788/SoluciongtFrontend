import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Acceso} from '../interface/bo/Acceso';
import {Observable} from 'rxjs';

const backendUrl = environment.backendAuth;

@Injectable()
export class AuthService {

  token: string;
  userId: string;
  AuthSecurity: boolean;
  logged = false;
  id: string;

  private accesos: Acceso[] = null;

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
  getAccess( ): Promise<Acceso[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.token
    });

    return new Promise<Acceso[]>( async(resolve, reject) => {
      try {
        if ( !this.accesos ) {
          await this.http.get(backendUrl + 'usuario/permissions/' + this.userId, {headers: headers})
            .subscribe(data => {
              this.accesos = <Acceso[]>data;
              resolve(this.accesos);
            }, error => {
              reject();
            });
        } else {
          resolve(this.accesos);
        }
      } catch (e) {
        reject();
      }
    });
  }

  // getAccess( ): Observable<Acceso[]> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-Auth-Token': this.token
  //   });
  //
  //   return new Observable( (observer) => {
  //     try {
  //       if ( !this.accesos ) {
  //         this.http.get(backendUrl + 'usuario/permissions/' + this.userId, {headers: headers})
  //           .subscribe(data => {
  //             this.accesos = <Acceso[]>data;
  //             observer.next(this.accesos);
  //           }, error => {
  //             observer.error(error);
  //           });
  //       } else {
  //         observer.next(this.accesos);
  //       }
  //     } catch (e) {
  //       observer.error( e );
  //     }
  //   });
  // }

  saveSession() {
    return new Promise<void>((resolve, reject) => {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.userId);
        localStorage.setItem('id', this.id);
        this.logged = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
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
        this.id = localStorage.getItem('id');
        resolve();
    });
  }

}
