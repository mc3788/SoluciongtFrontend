export class Perfil {

  id: number;
  descripcion: string;
  observaciones: string;

  constructor( id: number,
               descripcion: string,
               observaciones: string
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.observaciones = observaciones;
  }

}
