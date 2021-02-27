import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts';
import {NumerosALetras} from './numeros-a-letras';
import {Cotizacion} from '../interface/bo/Cotizacion';
import {DatePipe} from '@angular/common';
import {FormatAmountPipe} from '../pipes/format-amount.pipe';

@Injectable()
export class CreaPdf {

  marginHeaderLeft = 400;

  data = {
    enletras: '',
    tiempoEntrega: '',
    garantia: '',
    requiereInstalacion: '',
    lugarentrega: '',

  };
  info: Cotizacion;

  constructor( private http: HttpClient,
               private aLetras: NumerosALetras,
               private datePipe: DatePipe,
               private formatAmount: FormatAmountPipe) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async createDocument( info: Cotizacion): Promise<void> {
    // console.log('Creando documeto pdf');
    this.info = info;

    const def = {
      content: [],
      styles: {},
      pageSize: 'LETTER',
      footer: this.getFooter(),
      pageMargins: [40, 62, 40, 62],
      defaultStyle: { fontSize: 9, lineHeight: 1.25,  font: 'Helvetica' }
    };

    def.content.push(...await this.getHeader());
    def.content.push(...this.getSubHeader());
    def.content.push(...this.getClientData());
    def.content.push(...this.getDetail());
    def.content.push(...this.getObs());
    def.content.push(...this.getBusinessName());
    def.content.push(...this.getSignature());
    def.styles = this.getStyle();

    pdfMake.fonts = {
      Helvetica: {
        normal: 'Helvetica.ttf',
        bold: 'Helvetica-Bold.ttf',
        italics: 'Helvetica-Oblique.ttf',
        bolditalics: 'Helvetica-BoldOblique.ttf'
      }
    };
    pdfMake.createPdf(def).download();
  }


  async getHeader(): Promise<object[]> {

    const img = this.getBase64Image('assets/img/soluciongt.png').then( value => {
      // console.log(`*** img: ${value} `);
      // console.log(value);
      return [
        {image: value, fit: ['225', '225'], absolutePosition: {x: 365, y: 15} },
        { columns: [
            { text: [ { text: 'FECHA  ', bold: true} ,
                this.datePipe.transform( this.info.fecha, 'dd-MM-yyyy' ) ]},
          ], margin: [this.marginHeaderLeft, 20, 0, 0], style: 'header' },
        { columns: [
            {text: [ {text: 'COTIZACION NO.  ', bold: true},
                this.info.numero
              ]
            },
          ], margin: [this.marginHeaderLeft, 0, 0, 0], style: 'header' },
        { columns: [
            {text: [ {text: 'SERIE  ', bold: true},
                this.info.serie.serie ] },
          ], margin: [this.marginHeaderLeft, 0, 0, 0], style: 'header' }
      ];
    });

    return await img;

  }

  private getSubHeader(): object[] {
    return [
      // {text: '', margin: [0, 30, 0, 0]},
      {text: 'SEÑORES', bold: true},
      {text: this.info.cliente.departamento, bold: true},
      {text: this.info.cliente.nombre, bold: true}

    ];
  }

  private getClientData(): object[] {
    return [
      {text: '', margin: [0, 30, 0, 0]},
      {text: 'ESTIMADOS SEÑORES:', bold: true},
      {text: 'ADJUNTO SOMETEMOS A SU AMABLE CONSIDERACIÓN, NUESTRA PROFORMA QUE DETALLA LA VENTA DE LOS SIGUIENTES'},
      {text: '', margin: [0, 20, 0, 0]},
      { layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [ 'auto', '*', 'auto', '*', 'auto', '*' ],
          body: [
            [
              { text: 'NOG:', bold: true}, { text: this.info.numeroNOG},
              { text: 'EVENTO:', align: 'right', bold: true}, { text: this.info.evento },
              { text: 'PEDIDO:', align: 'right', bold: true}, { text: this.info.pedido },
            ],
            [
              { text: '  '}, { text: '  '},
              { text: 'CODIGO IGSS:', align: 'right', bold: true}, { text: this.info.codigoIGSS },
              { text: 'CODIGO PPR:', align: 'right', bold: true}, { text: this.info.codigoPPR },
            ]
          ]
        }}
    ];
  }


  private getDetail(): object[] {
    const det = [];
    const deta = [];
    let tot = 0 ;
    for ( const dd of this.info.detalle ) {
      const x = [ {text: dd.cantidad, alignment: 'center', margin: [ 0, 45, 0 , 0], bold: true },
        {text: dd.descripcion, bold: true },
        { columns: [
            { width: 'auto', text: 'Q', bold: true },
            { width: '*', text: this.formatAmount.transform( dd.precio ), alignment: 'right', bold: true }
          ], margin: [ 0, 45, 0 , 0] },
        { columns: [
            { width: 'auto', text: 'Q', bold: true },
            { width: '*', text: this.formatAmount.transform( dd.precio * dd.cantidad) , alignment: 'right', bold: true }
          ], margin: [ 0, 45, 0 , 0] }
      ];
      tot = tot + ( dd.precio * dd.cantidad );
      this.data.tiempoEntrega = dd.tiempoEntrega;
      this.data.garantia = dd.garantia;
      this.data.requiereInstalacion = dd.requiereInstalacion;
      det.push( ...x );
      deta.push( det );
    }

    const body = [
      [ {text: 'CANTIDAD', style: 'columnHeader'},
        {text: 'DESCRIPCION', style: 'columnHeader'},
        {text: 'PRECIO UNITARIO', style: 'columnHeader'},
        {text: 'PRECIO TOTAL', style: 'columnHeader'}]
    ];

    const total = [];
    total.push ( [ { colSpan: 2, border: [false, false, false, false],
      text: '***** PRECIOS INCLUYEN IVA *****', bold: true , alignment: 'center'},
      {},
      {text: 'TOTAL', bold: true, alignment: 'right', style: 'columnHeader', margin: [ 0, 2, 0 , 0] },
      { columns: [
          {width: 'auto', text: 'Q', bold: true },
          {width: '*', text: this.formatAmount.transform(tot), alignment: 'right', bold: true }],
        margin: [ 0, 2, 0 , 0] , style: 'columnHeader'}
    ]);

    body.push( ...deta );
    body.push( ...total );

    this.data.enletras = this.aLetras.numerosALetras( tot, null ) + ' QUETZALES';

    return [
      {text: '', margin: [0, 10, 0, 0]},
      {
        table: {
          style: 'bold',
          headerRows: 1,
          widths: ['auto', '*', 100, 100],
          heights: ['*', 100, '*'],
          body
        }
      }
    ];
  }

  private getObs(): object[] {
    return [
      { text: '', margin: [0, 20, 0, 0] },
      { text: [ {text: 'CANTIDAD EN LETRAS: ', bold: true}, this.data.enletras ] },
      { text: `TIEMPO DE ENTREGA: ${this.data.tiempoEntrega}`, bold: true },
      { text: `GARANTIA: ${this.data.garantia}`, bold: true },
      { text: `INSTALACION: ${this.data.requiereInstalacion}`, bold: true },
      { text: [ { text: 'SOSTENIMIENTO DE OFERTA: ', bold: true }, this.info.oferta] },
      { text: [ { text: 'LUGAR DE ENTREGA: ', bold: true }, this.info.bodega.descripcion ]}
    ];
  }

  private getBusinessName(): object[] {
    return [
      { text: '', margin: [0, 20, 0, 0] },
      { text: `RAZON SOCIAL: ${this.info.razonsocial.nombre}`, bold: true },
      { text: `NOMBRE COMERCIAL: ${this.info.razonsocial.nombreComercial}` },
      { text: `NOMBRE DEL REPRESENTANTE LEGAL: ${this.info.razonsocial.representanteLegal}` },
      { text: `DIRECCIÓN: ${this.info.razonsocial.direccion}` },
      { text: `NIT: ${this.info.razonsocial.nit}` },
      { text: `REGIMEN DE IMPUESTO SOBRE LA RENTA: ${this.info.razonsocial.regimenImpuesto}` },
      { text: `NÚMERO DE CUENTA BANCARIA MONETARIA: ${this.info.razonsocial.cuentaBancaria}` },
      { text: `TELEFONO: ${this.info.razonsocial.telefono}` },
      { text: `CORREO ELECTRÓNICO: ${this.info.razonsocial.correoElectronico}` },
    ];
  }

  private getSignature(): object[] {
    return [
      { text: '', margin: [0, 40, 0, 0] },
      { text: `${this.info.razonsocial.representanteFirma}` },
      { text: 'REPRESENTANTE LEGAL' },
      { text: `CELULAR ${this.info.razonsocial.numeroCelular}` }
    ];
  }


  private getFooter(): object {
    return {
      stack: [
        { text: 'TEL.(502) 2255-1729 / 5516-2909' },
        { text: 'EMAIL. INFO@SOLUCIONGT.COM' },
        { text: 'PÁGINA WEB. WWW.SOLUCIONGT.COM'},
      ],
      style: 'footer'
    };
  }


  private getStyle(): object {
    const styles = {
      columnHeader: {
        color: '#000',
        fillColor: '#b4d2ea',
        bold: true,
        alignment: 'center'
      },
      header: {
        fontSize: 9,
        margin: [0, 2, 0, 0]
      },
      footer: {
        color: '#2c73b7',
        alignment: 'center',
        bold: true,
        margin: [0, 0, 0, 30]
      },
      rowDetail: {
        height: 100
      }

    };


    return styles;
  }

  private getBase64Image(imgUrl: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(imgUrl, {responseType: 'blob'})
        .subscribe(res => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve( base64data );
          };
          reader.readAsDataURL(res);
        });
    });

  }

}
