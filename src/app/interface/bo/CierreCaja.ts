export class CierreCaja {
    id: number;
    mes: number;
    anio: number;
    fechaInicio:   number;
    fechaFinal: number;
    fechaCierre: number;
    montoCredito: number;
    montoDebito: number;
    observaciones: string;
  
    constructor( 
        id: number,
        mes: number,
        anio: number,
        fechaInicio:   number,
        fechaFinal: number,
        fechaCierre: number,
        montoCredito: number,
        montoDebito: number,
        observaciones: string
    ) {
      this.id = id;
      this.mes = mes;
      this.anio = anio;
      this.fechaInicio = fechaInicio;
      this.fechaFinal = fechaFinal;
      this.fechaCierre = fechaCierre;
      this.montoCredito = montoCredito;
      this.montoDebito = montoDebito;
      this.observaciones = observaciones;
    }
  
  }
  