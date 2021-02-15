export class Cotizacion {

    id : number;
    idCliente: number;
    fecha : string;
    numero : number;
    numeroNOG : string;
    evento: string;
    pedido: string;
    codigoIGSS: string;
    codigoPPR: string;
    oferta: number;
    idRazonSocial: number;
    idSerie: string;
    tipo: string;
    idUsuario: number;
    
    constructor(     id : number,
      idCliente: number,
      fecha : string,
      numero : number,
      numeroNOG : string,
      evento: string,
      pedido: string,
      codigoIGSS: string,
      codigoPPR: string,
      oferta: number,
      idRazonSocial: number,
      idSerie: string,
      tipo: string,
      idUsuario: number
    ) {
      this.id = id;
      this.idCliente = idCliente;
      this.fecha = fecha;
      this.numero = numero;
      this.numeroNOG = numeroNOG;
      this.evento = evento;
      this.pedido = pedido;
      this.codigoIGSS = codigoIGSS;
      this.codigoPPR = codigoPPR;
      this.oferta = oferta;
      this.idRazonSocial = idRazonSocial;
      this.idSerie = idSerie;
      this.tipo = tipo;
      this.idUsuario = idUsuario;
    }
  
  }
  