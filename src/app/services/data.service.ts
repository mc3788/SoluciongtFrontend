import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

const backendUrl = environment.backendUrl;

@Injectable()
export class DataService {

  constructor( private http: HttpClient,
               private authService: AuthService,
               private router: Router ) {
  }

  // Editar
  public editEntity(entity: string, token: string, id: number, object: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.put(backendUrl + entity + '/' + id, JSON.stringify(object), {headers: headers});
  }

  // Borrar
  public deleteEntity(entity: string, token: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.delete(backendUrl + entity + '/' + id, {headers: headers});
  }

  // Leer
  public getAllItemsFromEntity(entity: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.get(backendUrl + entity, {headers: headers});
  }

  // Insertar
  public insertNewEntity(entity: string, token: string, object: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.post(backendUrl + entity, JSON.stringify(object), {headers: headers});
  }

  // Listado por ID
  public getListItems(entity: string, token: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });
    console.log(backendUrl + entity + '/' + id, {headers: headers});
    return this.http.get(backendUrl + entity + '/' + id, {headers: headers});
  }


  // Listado por Fecha
  public getListDate(entity: string, token: string, fecIni: String, fecFin: String) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });
    /*console.log(backenUrl + entity+ '/' + fecIni+'/' + fecFin);*/
    return this.http.get(backendUrl + entity + '/' + fecIni + '/' + fecFin, {headers: headers});
  }

  public getEntityDetail(entity: string, token: string, id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.get(backendUrl + entity + '/' + id, {headers: headers});
  }

  public validError( error ) {
    if ( error.status && ( error.status === 403 || error.status === 401 ) ) {
      this.authService.logout();
      this.router.navigate(['/login']);

    }
  }

}
