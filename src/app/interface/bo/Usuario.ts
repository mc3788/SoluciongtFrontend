import {Perfil} from './Perfil';

export class Usuario {

  id: number;
  usuario: string;
  idPerfil: number;
  nombre: string;
  password: string;
  estado: string;
  perfil: Perfil;

  constructor( id: number,
               usuario: string,
               idPerfil: number,
               nombre: string,
               password: string,
               estado: string,
               perfil: Perfil) {
        this.id = id;
        this.usuario = usuario;
        this.idPerfil = idPerfil;
        this.nombre = nombre;
        this.password = password;
        this.estado = estado;
    }

}
