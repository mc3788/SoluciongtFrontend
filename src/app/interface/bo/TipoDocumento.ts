export class TipoDocumento {

    id: number;
    descripcion: string;
    operacion: string;
  
    constructor( id: number,
        descripcion: string,
        operacion: string
    ) {
      this.id = id;
      this.descripcion = descripcion;
      this.operacion = operacion;
    }
  
  }
  