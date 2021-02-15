import {Proveedor} from './Proveedor';

export class Producto {

    id: number;
    descripcion: string;
    precioCosto: number;
    precioVenta: number;
    observaciones: string;
  
    constructor(id: number,
      descripcion: string,
                precioCosto: number,
                precioVenta: number,
                observaciones: string
                 
    ) {
      this.id = id;
      this.descripcion = descripcion;
      this.precioCosto = precioCosto;
      this.precioVenta = precioVenta;
      this.observaciones = observaciones;
    }
  
  }
  