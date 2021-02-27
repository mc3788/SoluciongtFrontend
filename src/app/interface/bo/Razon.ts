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
    representanteFirma: string;
    numeroCelular: string;

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
                    representanteFirma: string,
                    numeroCelular: string
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
          this.correoElectronico = correoElectronico;
          this.representanteFirma = representanteFirma;
          this.numeroCelular =  numeroCelular;
      }

  }
