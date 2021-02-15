export class Contacto {

    id : number;
    idCliente: number;
    nombre : string;
    telefono : string;
    direccion : string;
    observaciones : string;
    
    constructor( id : number,
        idCliente: number,
        nombre : string,
        telefono : string,
        direccion : string,
        observaciones : string
    ) {
      this.id = id;
      this.idCliente = idCliente;
      this.nombre = nombre;
      this.telefono = telefono;
      this.direccion = direccion;
      this.observaciones = observaciones;
    }
  
  }
  