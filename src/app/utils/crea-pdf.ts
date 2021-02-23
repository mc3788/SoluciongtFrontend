import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts';
import {NumerosALetras} from './numeros-a-letras';

@Injectable()
export class CreaPdf {

  marginHeaderLeft = 400;

  data = {
    header: { fecha: '01/01/2021', noCotizacion: '191', serie: 'E',
      nog: '13912631', evento: 'S/C', pedido: 'S/C', codigoIGSS: 'S/C', codigoPPR: 'S/C' },
    cliente: { nombre1: 'DEPARTAMENTO DE COMPRAS', nombre2: 'IGSS, Consultorio Palín, Escuintla' },
    detalle: [ { cantidad: 1, descripcion: 'Refrigerador Material: Acero galvanizado; Medida: 12 pie Cúbico; Número de puertas: 4; Uso: Conservación de vacunas en cadena de frío; Unidad FIGIDAIRE',
      precio: 24640 } ],
    obs: {
      enletras: 'VEINTICUATRO MIL SETECIENTOS CUARENTA 00/100 QUETZALES',
      tiempoEntrega: '3 DIAS HABILES DESPUES DE RECIBIDA LA ORDEN DE COMPRA',
      garantia: '36 MESES POR DESPERFECTOS DE FABRICA',
      instalacion: 'NO APLICA',
      oferta: '60 DIAS',
      lugarEntrega: 'BODEGA DE UNIDAD'
    },
    razonSocial: {
      nombre: 'SOLUCION GT, SOCIEDAD ANONIMA',
      nombreComercial: 'SOLUCION GT',
      representante: 'KEVYN ALEJANDRO RAMIREZ CANTORAL',
      direccion: '11 AVENIDA 15-73 ZONA 17 COLONIA COLEGIO DE MAESTROS, GUATEMALA',
      nit: '9479828-1',
      regimenISR: 'SUJETO A PAGOS TRIMESTRALES',
      cuenta: '3445727767 BANRURAL',
      telefono: '22551729', email: 'info@soluciongt.com'}

  };



  constructor( private http: HttpClient, private aLetras: NumerosALetras ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // ( pdfMake as any ).vfs = pdfFonts.pdfMake.vfs;


  }

  async createDocument(): Promise<void> {
    // console.log('Creando documeto pdf');

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

    const img = this.getBase64Image('assets/images/soluciongt.png').then( value => {
      // console.log(`*** img: ${value} `);
      // console.log(value);
      return [
        {image: value, fit: ['225', '225'], absolutePosition: {x: 365, y: 15} },
        { columns: [
            { text: [ { text: 'FECHA  ', bold: true} ,
                this.data.header.fecha ]},
          ], margin: [this.marginHeaderLeft, 20, 0, 0], style: 'header' },
        { columns: [
            {text: [ {text: 'COTIZACION NO.  ', bold: true},
                this.data.header.noCotizacion
              ]
            },
          ], margin: [this.marginHeaderLeft, 0, 0, 0], style: 'header' },
        { columns: [
            {text: [ {text: 'SERIE  ', bold: true},
                this.data.header.serie ] },
          ], margin: [this.marginHeaderLeft, 0, 0, 0], style: 'header' }
      ];
    });

    return await img;

  }

  private getSubHeader(): object[] {
    return [
      // {text: '', margin: [0, 30, 0, 0]},
      {text: 'SEÑORES', bold: true},
      {text: this.data.cliente.nombre1, bold: true},
      {text: this.data.cliente.nombre2, bold: true}

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
              { text: 'NOG:', bold: true}, { text: this.data.header.nog},
              { text: 'EVENTO:', align: 'right', bold: true}, { text: this.data.header.evento},
              { text: 'PEDIDO:', align: 'right', bold: true}, { text: this.data.header.pedido},
            ],
            [
              { text: '  '}, { text: '  '},
              { text: 'CODIGO IGSS:', align: 'right', bold: true}, { text: this.data.header.codigoIGSS},
              { text: 'CODIGO PPR:', align: 'right', bold: true}, { text: this.data.header.codigoPPR},
            ]
          ]
        }}
    ];
  }


  private getDetail(): object[] {
    const det = [];
    const deta = [];
    let tot = 0 ;
    for ( const dd of this.data.detalle ) {
      const x = [ {text: dd.cantidad, alignment: 'center', margin: [ 0, 45, 0 , 0], bold: true },
        {text: dd.descripcion, bold: true },
        { columns: [
            { width: 'auto', text: 'Q', bold: true },
            { width: '*', text: this.formatAmount( dd.precio ), alignment: 'right', bold: true }
          ], margin: [ 0, 45, 0 , 0] },
        { columns: [
            { width: 'auto', text: 'Q', bold: true },
            { width: '*', text: this.formatAmount( dd.precio * dd.cantidad) , alignment: 'right', bold: true }
          ], margin: [ 0, 45, 0 , 0] }
      ];
      tot = tot + ( dd.precio * dd.cantidad );
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
          {width: '*', text: this.formatAmount(tot), alignment: 'right', bold: true }],
        margin: [ 0, 2, 0 , 0] , style: 'columnHeader'}
    ]);

    body.push( ...deta );
    body.push( ...total );

    this.data.obs.enletras = this.aLetras.numerosALetras( tot, null ) + ' QUETZALES';

    return [
      {text: '', margin: [0, 10, 0, 0]},
      {
        table: {
          style: 'bold',
          headerRows: 1,
          widths: ['*', 'auto', 100, 100],
          heights: ['*', 100, '*'],
          body
          // [ [ {text: 'CANTIDAD', style: 'columnHeader'},
          //   {text: 'DESCRIPCION', style: 'columnHeader'},
          //   {text: 'PRECIO UNITARIO', style: 'columnHeader'},
          //   {text: 'PRECIO TOTAL', style: 'columnHeader'}],
          // [ {text: '1', alignment: 'center', margin: [ 0, 45, 0 , 0], bold: true },
          //   {text: 'Refrigerador Material: Acero galvanizado; Medida: 12 pie Cúbico; Número de puertas: 4;
          //   Uso: Conservación de vacunas en cadena de frío; Unidad FIGIDAIRE', bold: true },
          //   { columns: [ {width: 'auto', text: 'Q', bold: true }, {width: '*', text: '24,640.00', alignment: 'right', bold: true }],
          //   margin: [ 0, 45, 0 , 0] },
          //   { columns: [ {width: 'auto', text: 'Q', bold: true }, {width: '*', text: '24,640.00', alignment: 'right', bold: true }],
          //   margin: [ 0, 45, 0 , 0] }
          // ],
          // [ { colSpan: 2, border: [false, false, false, false],
          //     text: '***** PRECIOS INCLUYEN IVA *****', bold: true , alignment: 'center'},
          //   {},
          //   {text: 'TOTAL', bold: true, alignment: 'right', style: 'columnHeader', margin: [ 0, 2, 0 , 0] },
          //   { columns: [ {width: 'auto', text: 'Q', bold: true },
          //   {width: '*', text: '24,640.00', alignment: 'right', bold: true }], margin: [ 0, 2, 0 , 0] , style: 'columnHeader'}
          //   // {text: 'Q 24,640.00', alignment: 'right', style: 'columnHeader'}
          //   ]
          // ]
        }
      }
    ];
  }

  private getObs(): object[] {
    return [
      { text: '', margin: [0, 20, 0, 0] },
      { text: [ {text: 'CANTIDAD EN LETRAS: ', bold: true}, this.data.obs.enletras ] },
      { text: `TIEMPO DE ENTREGA: ${this.data.obs.tiempoEntrega}`, bold: true },
      { text: `GARANTIA: ${this.data.obs.garantia}`, bold: true },
      { text: `INSTALACION: ${this.data.obs.instalacion}`, bold: true },
      { text: [ { text: 'SOSTENIMIENTO DE OFERTA: ', bold: true }, this.data.obs.oferta] },
      { text: [ { text: 'LUGAR DE ENTREGA: ', bold: true }, this.data.obs.lugarEntrega ]}
    ];
  }

  private getBusinessName(): object[] {
    return [
      { text: '', margin: [0, 20, 0, 0] },
      { text: `RAZON SOCIAL: ${this.data.razonSocial.nombre}`, bold: true },
      { text: `NOMBRE COMERCIAL: ${this.data.razonSocial.nombreComercial}` },
      { text: `NOMBRE DEL REPRESENTANTE LEGAL: ${this.data.razonSocial.representante}` },
      { text: `DIRECCIÓN: ${this.data.razonSocial.direccion}` },
      { text: `NIT: ${this.data.razonSocial.nit}` },
      { text: `REGIMEN DE IMPUESTO SOBRE LA RENTA: ${this.data.razonSocial.regimenISR}` },
      { text: `NÚMERO DE CUENTA BANCARIA MONETARIA: ${this.data.razonSocial.cuenta}` },
      { text: `TELEFONO: ${this.data.razonSocial.telefono}` },
      { text: `CORREO ELECTRÓNICO: ${this.data.razonSocial.email}` },
    ];
  }

  private getSignature(): object[] {
    return [
      { text: '', margin: [0, 40, 0, 0] },
      { text: 'ALEJANDRO RAMIREZ' },
      { text: 'REPRESENTANTE LEGAL' },
      { text: 'CELULAR 5516-2909' }
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

  private formatAmount( value ): string {
    return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
}
