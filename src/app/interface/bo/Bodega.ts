export class Bodega {

  id: number;
  descripcion: string;
  observaciones: number;
  estado: string;

  constructor(  id: number,
                descripcion: string,
                observaciones: number,
                estado: string
               ) {
        this.id = id;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
        this.estado = estado;
    }

}
