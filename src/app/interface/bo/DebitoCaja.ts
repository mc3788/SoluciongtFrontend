import {Proveedor} from './Proveedor';

export class DebitoCaja {

    id: number;
    fecha: Date;
    idProveedor: Proveedor;
    idCierre: number;
    noFactura: number;
    noOrden: number;
    monto: number;
    descripcion: string;
  
    constructor(id: number,
                fecha: Date,
                idProveedor: Proveedor,
                idCierre: number,
                noOrden: number,
                noFactura: number,
                monto: number,
                descripcion: string){
        this.id = id;
        this.fecha = fecha;
        this.idProveedor = idProveedor;
        this.idCierre = idCierre;
        this.noOrden = noOrden;
        this.noFactura = noFactura;
        this.monto = monto;
        this.descripcion = descripcion;
      }
  
  }
  