import {Detalle} from './Detalle';
import {Letra} from './Letra';
import {Cliente} from './Cliente';
import {Razon} from './Razon';

export class Cotizacion {

  id: number;
  idCliente: number;
  fecha: Date;
  numero: number;
  numeroNOG: string;
  evento: string;
  pedido: string;
  codigoIGSS: string;
  codigoPPR: string;
  oferta: number;
  idRazonSocial: number;
  idSerie: string;
  tipo: string;
  idUsuario: number;
  detalle: Array<Detalle>;
  serie: Letra;
  cliente: Cliente;
  razonsocial: Razon;

  constructor(id: number,
              idCliente: number,
              fecha: Date,
              numero: number,
              numeroNOG: string,
              evento: string,
              pedido: string,
              codigoIGSS: string,
              codigoPPR: string,
              oferta: number,
              idRazonSocial: number,
              idSerie: string,
              tipo: string,
              idUsuario: number,
              detalle: Array<Detalle>,
              serie: Letra,
              cliente: Cliente,
              razonsocial: Razon
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
    this.detalle = detalle;
    this.serie = serie;
    this.cliente = cliente;
    this.razonsocial = razonsocial;
  }
}
