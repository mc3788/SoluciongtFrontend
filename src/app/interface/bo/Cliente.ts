export class Cliente {

    id: number;
    nit: string;
    nombre: string;
    telefono: string;
    direccion: string;
    observaciones: string;
    departamento: string;

    constructor( id: number,
        nit: string,
        nombre: string,
        telefono: string,
        direccion: string,
        observaciones: string,
        departamento: string
    ) {
      this.id = id;
      this.nit = nit;
      this.nombre = nombre;
      this.telefono = telefono;
      this.direccion = direccion;
      this.observaciones = observaciones;
      this.departamento = departamento;
    }
  }
