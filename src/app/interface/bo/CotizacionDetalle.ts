export class CotizacionDetalle {

  id : number;
  idCotizacion : number;
  idProducto : string;
  descripcion : string;
  marca : number;
  cantidad : number;
  precio : string;
  tiempoEntrega: string;
  requiereinstalacion: string;
  garantia : string;
  mantenimiento : string
    
    constructor(id : number,
      idCotizacion : number,
      idProducto : string,
      descripcion : string,
      marca : number,
      cantidad : number,
      precio : string,
      tiempoEntrega: string,
      requiereinstalacion: string,
      garantia : string,
      mantenimiento : string
    ) {
      this.id = id;
      this.idCotizacion = idCotizacion;
      this.idProducto = idProducto;
      this.descripcion = descripcion;
      this.marca = marca;
      this.cantidad = cantidad;
      this.precio = precio;
      this.tiempoEntrega = tiempoEntrega;
      this.requiereinstalacion = requiereinstalacion;
      this.garantia = garantia;
      this.mantenimiento = mantenimiento
    }
  
  }
  