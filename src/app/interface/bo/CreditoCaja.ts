export class CreditoCaja {

    id: number;
    fecha: Date;
    idCierre: number;
    noDocumento: number;
    monto: number;
    descripcion: string;
    tipo: string;
  
    constructor(id: number,
                fecha: Date,
                idCierre: number,
                noDocumento: number,
                monto: number,
                descripcion: string,
                tipo: string ) {
        this.id = id;
        this.fecha = fecha;
        this.idCierre = idCierre;
        this.noDocumento = noDocumento;
        this.monto = monto;
        this.descripcion = descripcion;
        this.tipo = tipo;
      }
  
  }
  