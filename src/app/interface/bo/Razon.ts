export class Razon {

    id: number;
    nombre: string;
    direccion: string;
    nombreComercial: string;
    representanteLegal: string;
    nit: string;
    cuentaBancaria: string;
    regimenImpuesto: string;
    telefono: string;
    correoElectronico: string;

     constructor(  id: number,
                    nombre: string,
                    direccion: string,
                    nombreComercial: string,
                    representanteLegal: string,
                    nit: string,
                    cuentaBancaria: string,
                    regimenImpuesto: string,
                    telefono: string,
                    correoElectronico: string,
                 ) {
          this.id = id;
          this.nombre = nombre;
          this.direccion = direccion;
          this.nombreComercial = nombreComercial;
          this.representanteLegal = representanteLegal;
          this.nit = nit;
          this.cuentaBancaria = cuentaBancaria;
          this.regimenImpuesto = regimenImpuesto;
          this.telefono = telefono;
          this.correoElectronico = correoElectronico
      }

  }
