export class Detalle {

  id: number;
  idCotizacion: number;
  idProducto: string;
  descripcion: string;
  marca: number;
  cantidad: number;
  precio: number;
  tiempoEntrega: string;
  requiereInstalacion: string;
  garantia: string;
  mantenimiento: string;

  constructor( id: number,
               idCotizacion: number,
               idProducto: string,
               descripcion: string,
               marca: number,
               cantidad: number,
               precio: number,
               tiempoEntrega: string,
               requiereInstalacion: string,
               garantia: string,
               mantenimiento: string) {

    this.id = id;
    this.idCotizacion = idCotizacion;
    this.idProducto = idProducto;
    this.descripcion = descripcion;
    this.marca = marca;
    this.cantidad = cantidad;
    this.precio = precio;
    this.tiempoEntrega = tiempoEntrega;
    this.requiereInstalacion = requiereInstalacion;
    this.garantia =  garantia;
    this.mantenimiento = mantenimiento;
  }

}
