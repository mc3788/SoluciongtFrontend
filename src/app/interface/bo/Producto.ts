export class Producto {

    id: number;
    descripcion: string;
    precioCosto: number;
    precioVenta: number;
    observaciones: string;
    marca: string;

    constructor(id: number,
                descripcion: string,
                precioCosto: number,
                precioVenta: number,
                observaciones: string,
                marca: string
    ) {
      this.id = id;
      this.descripcion = descripcion;
      this.precioCosto = precioCosto;
      this.precioVenta = precioVenta;
      this.observaciones = observaciones;
      this.marca = marca;
    }

  }
