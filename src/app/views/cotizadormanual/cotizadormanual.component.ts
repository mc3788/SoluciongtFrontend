import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Cotizacion} from '../../interface/bo/Cotizacion';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CotizacionDTO} from '../../interface/dto/CotizacionDTO';
import {CotizacionDetalleDTO} from '../../interface/dto/CotizacionDetalleDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import {Cliente} from '../../interface/bo/Cliente';
import {Letra} from '../../interface/bo/Letra';
import {Producto} from '../../interface/bo/Producto';
import {CreaPdf} from '../../utils/crea-pdf';
import {DatePipe} from '@angular/common';
import {Razon} from '../../interface/bo/Razon';
import {CotizacionDetalle} from '../../interface/bo/CotizacionDetalle';
import {Bodega} from '../../interface/bo/Bodega';
import {FormatAmountPipe} from '../../pipes/format-amount.pipe';


@Component({
  selector: 'app-cotizadormanual',
  templateUrl: './cotizadormanual.component.html',
  styleUrls: ['./cotizadormanual.component.css']
})
export class CotizadormanualComponent implements OnInit {

  title = '';
  searchText = '';
  searchClient = '';
  searchProduct = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;
  SerieTemp = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;
  modalFormDetail: FormGroup;


  cotizaciones: Cotizacion[];
  detail: Cotizacion;
  cotizacionDetail: CotizacionDetalle;
  detalles: CotizacionDetalle[];
  clientes: Cliente[];
  filteredClients: Cliente[];
  productos: Producto[];
  filteredProducts: Producto[];
  razones: Razon[];
  letra: Letra;
  series: Letra[];

  bodegas: Bodega[];

  deletetype: number = 0;

  isReady = false;

  showDetailData = false;

  public accesos: Acceso;

  selId: number;
  selName: string;

  titleWarning: string;
  messageWarning: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('entityModalDetail') public entityModalDetail: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('clienteModal') public clientModal: ModalDirective;
  @ViewChild('productoModal') public productModal: ModalDirective;
  @ViewChild('warningModal') public warningModal: ModalDirective;


  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService,
              private creaPdf: CreaPdf,
              private datePipe: DatePipe,
              public formatAmount: FormatAmountPipe) {

    this.authService.getAccess().then( access => {
      this.accesos = access.find(a => a.opcion === 'Manual');
      this.isReady = true;
    });

    this.dataService.getAllItemsFromEntity('cotizacionEncabezado', this.authService.token)
      .subscribe(res => {
        this.cotizaciones = (<Cotizacion[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });
    this.dataService.getAllItemsFromEntity('cliente', this.authService.token)
      .subscribe(resp => {
        this.clientes = (<Cliente[]>resp);
        this.assignCopyClient();
      }, error => {
        console.error(JSON.stringify(error));
      });

    this.dataService.getAllItemsFromEntity('producto', this.authService.token)
      .subscribe(resp => {
        this.productos = (<Producto[]>resp);
        this.assignCopyProduct();
      }, error => {
        console.error(JSON.stringify(error));
      });

    this.dataService.getAllItemsFromEntity('serie', this.authService.token)
      .subscribe(resp => {
        this.series = (<Letra[]>resp);
      }, error => {
        console.error(JSON.stringify(error));
      });

    this.dataService.getAllItemsFromEntity('bodega', this.authService.token)
      .subscribe(resp => {
        this.bodegas = (<Bodega[]>resp);
      }, error => {
        console.error(JSON.stringify(error));
      });

    this.dataService.getAllItemsFromEntity('razonSocial', this.authService.token)
      .subscribe(resp => {
        this.razones = (<Razon[]>resp);
      }, error => {
        console.error(JSON.stringify(error));
      });

    this.dataService.getEntityDetail('serie/getByUserId', this.authService.token, this.authService.id)
        .subscribe(res => {
          this.letra = (<Letra>res);
        }, error => {
          console.error(JSON.stringify(error));
        });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      cliente: ['', Validators.required],
      fecha: ['', Validators.required],
      numero: [''],
      numeroNog: [''],
      evento: [''],
      pedido: [''],
      codigoIgss: [''],
      codigoPpr: [],
      oferta: [''],
      razon: [''],
      bodega: [''],
      serie: [ this.letra ? this.letra.id : '' ],
      tipo: ['M'],
      idUsuario: ['']

    });

    // Inicializa el form construyendolo con los campos
    this.modalFormDetail = this.formBuilder.group({
      numeroCotizacion: [],
      idProducto: ['', Validators.required],
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tiempoEntrega: ['', Validators.required],
      requiereInstalacion: [''],
      garantia: [''],
      mantenimiento: ['']
    });



  }

  assignCopyClient() {
    this.filteredClients = Object.assign([], this.clientes );
  }

  filterClient( value ) {
    if ( !value ) {
      this.assignCopyClient();
    } else {
      this.filteredClients = Object.assign([], this.clientes )
        .filter( item => ( (item.nombre.toLowerCase().indexOf( value.toLowerCase() ) > -1) || ( String(item.nit).indexOf( value) > -1 ) ) );
    }
  }

  assignCopyProduct() {
    this.filteredProducts = Object.assign([], this.productos );
  }

  filterProduct( value ) {
    if ( !value ) {
      this.assignCopyProduct();
    } else {
      this.filteredProducts = Object.assign([], this.productos )
        .filter( item => ( (item.descripcion.toLowerCase().indexOf( value.toLowerCase() ) > -1) ||
          (item.observaciones.toLowerCase().indexOf( value.toLowerCase() ) > -1)  ) );
    }
  }

  get f() {
    return this.modalForm.controls;
  }

  get fd() {
    return this.modalFormDetail.controls;
  }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      cliente: ['', Validators.required],
      fecha: ['', Validators.required],
      numero: [''],
      numeroNog: [''],
      evento: [''],
      pedido: [''],
      codigoIgss: [''],
      codigoPpr: [],
      oferta: [''],
      razon: [''],
      bodega: [''],
      tipo: [''],
      serie: [ this.letra ? this.letra.id : '' ],
    });
    this.entityModal.show();

  }

  openToModify(id: number) {
    this.submitted = false;
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('cotizacionEncabezado', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Cotizacion>resp);


        // se ingresan los valores en el form y validacionesxw
        this.modalForm = this.formBuilder.group({
          idCliente: [this.detail.idCliente, Validators.required],
          cliente: [this.detail.cliente.nombre, Validators.required],
          numero: [this.detail.numero],
          fecha: [this.datePipe.transform(this.detail.fecha, 'yyyy-MM-dd'), Validators.required],
          numeroNog: [this.detail.numeroNOG],
          evento: [this.detail.evento],
          pedido: [this.detail.pedido],
          codigoIgss: [this.detail.codigoIGSS],
          codigoPpr: [this.detail.codigoPPR],
          oferta: [this.detail.oferta],
          razon: [this.detail.idRazonSocial],
          bodega: [this.detail.idBodegaEntrega],
          tipo: [this.detail.tipo],
          serie: [ this.detail.idSerie ]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('cotizacionEncabezado', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Cotizacion>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          cliente: [this.detail.cliente.nombre],
          idCliente: [this.detail.idCliente],
          serie: [this.detail.idSerie],
          razon: [this.detail.idRazonSocial],
          bodega: [this.detail.idBodegaEntrega],
          fecha: [ this.datePipe.transform( this.detail.fecha, 'yyyy-MM-dd') ],
          numero: [this.detail.numero],
          usuario: [this.detail.idUsuario],
          tipo: [this.detail.tipo],
          evento: [this.detail.evento],
          codigoIgss: [this.detail.codigoIGSS],
          codigoPpr: [this.detail.codigoPPR],
          oferta: [this.detail.oferta],
          numeroNog: [this.detail.numeroNOG],
          pedido: [this.detail.pedido]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });

    // this.entityModal.show();
  }

  openToDelete(id: number, name: string, type: number) {
    // type 1 = header; 2 = detail;
    this.deletetype = type;
    this.submitted = false;
    this.selId = id;
    this.selName = name;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  openWarning( message: string, title: string ) {
    this.titleWarning = title;
    this.messageWarning = message;
    this.warningModal.show();
  }

  dismiss() {
    this.entityModal.hide();
  }

  dismissDetail() {
    if ( this.modalMode === 1) {
      this.entityModalDetail.hide();
    } else {
      this.showDetailData = false;
    }
  }

  deleteReg() {
    let entity = '';
    if ( this.deletetype === 1 ) {
      entity = 'cotizacionEncabezado';
    } else if ( this.deletetype === 2 ) {
      entity = 'cotizacionDetalle';
    }
    this.dataService.deleteEntity( entity, this.authService.token, this.selId )
      .subscribe(resp => {
        if ( this.deletetype === 2 ) {
          this.entityModalDetail.hide();
        }
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  saveChanges() {
    this.submitted = true;

    if (this.modalForm.invalid) {
      return;
    }

    const dto: CotizacionDTO = {
      idCliente: this.modalForm.value.idCliente,
      fecha: this.modalForm.value.fecha,
      numero: this.modalMode === 1 ? 1 : this.modalForm.value.numero,
      numeroNOG: this.modalForm.value.numeroNog,
      evento: this.modalForm.value.evento,
      pedido: this.modalForm.value.pedido,
      codigoIGSS: this.modalForm.value.codigoIgss,
      codigoPPR: this.modalForm.value.codigoPpr,
      oferta: this.modalForm.value.oferta,
      idRazonSocial: this.modalForm.value.razon,
      idBodegaEntrega: this.modalForm.value.bodega,
      tipo: 'M',
      idSerie: this.modalForm.value.serie,
      idUsuario: this.authService.id
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('cotizacionEncabezado', this.authService.token, dto)
        .subscribe(resp => {
          this.reload();
          this.entityModal.hide();
        }, error2 => {
          this.existsError = true;
          this.existsErrorTitle = 'Error al grabar registro.';
          const timer = setTimeout(() => this.existsError = false, 6000);
          console.error(JSON.stringify(error2));
        });

    } else if (this.modalMode === 2) {
      // se insertan los datos modificados con el servicio de edicion
      this.dataService.editEntity('cotizacionEncabezado', this.authService.token, this.detail.id, dto)
        .subscribe(resp => {
          this.reload();
          this.entityModal.hide();
        }, error2 => {
          console.error(JSON.stringify(error2));
        });
    }

    // Recarga valores y los muestra en pantalla, queda pendiente pagineo
    this.reload();
    this.entityModal.show();

  }

  reload() {
    this.dataService.getAllItemsFromEntity('cotizacionEncabezado', this.authService.token)
      .subscribe(resp => {
        this.cotizaciones = (<Cotizacion[]>resp);
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  openToDetail(id: number) {

    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Detalle';
    this.showDetailData = false;
    this.modalFormDetail = this.formBuilder.group({
      numeroCotizacion: [id],
      idProducto: ['', Validators.required],
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: [''],
      cantidad: [''],
      precio: [''],
      tiempoEntrega: [''],
      requiereInstalacion: [''],
      garantia: [''],
      mantenimiento: ['']
    });

    this.dataService.getEntityDetail('cotizacionDetalle/byHeaderId/', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detalles = (<CotizacionDetalle[]>resp);

        this.entityModalDetail.show();
      });


  }

  openToModifyDetail( det: CotizacionDetalle, mode: number ) {
    this.modalMode = mode;
    this.cotizacionDetail = det;
    this.modalFormDetail = this.formBuilder.group({
      numeroCotizacion: [det.idCotizacion],
      idProducto: [ det.idProducto, Validators.required],
      producto: [ det.producto.descripcion, Validators.required],
      descripcion: [ det.descripcion, Validators.required],
      marca: [det.marca],
      cantidad: [det.cantidad],
      precio: [det.precio],
      tiempoEntrega: [det.tiempoEntrega],
      requiereInstalacion: [det.requiereInstalacion],
      garantia: [ det.garantia],
      mantenimiento: [ det.mantenimiento ]
    });
    this.showDetailData = true;
  }

  print( c: Cotizacion ) {

    if ( c.detalle && c.detalle.length > 0 ) {
      this.creaPdf.createDocument( c );
    } else {
      this.openWarning('No se existe detalle para esta cotización. Por favor ingresar el detalle.',
              'No se encontró detalle' );
    }

    // this.dataService.getEntityDetail('cotizacionEncabezado', this.authService.token, id)
    //   .subscribe(resp => {
    //     const c: Cotizacion = <Cotizacion>resp;
    //
    //     if ( c.detalle && c.detalle.length > 0 ) {
    //       this.creaPdf.createDocument( c );
    //     } else {
    //       this.openWarning('No se existe detalle para esta cotización. Por favor ingresar el detalle.',
    //         'No se encontró detalle' );
    //     }
    //
    //   }, error2 => {
    //     console.error(JSON.stringify(error2));
    //   });
  }

  saveChangesDetail() {
    this.submitted = true;

    if (this.modalFormDetail.invalid) {
      return;
    }

    const dto: CotizacionDetalleDTO = {
      idCotizacion: this.modalFormDetail.value.numeroCotizacion,
      idProducto: this.modalFormDetail.value.idProducto,
      descripcion: this.modalFormDetail.value.descripcion,
      marca: this.modalFormDetail.value.marca,
      cantidad: this.modalFormDetail.value.cantidad,
      precio: this.modalFormDetail.value.precio,
      tiempoEntrega: this.modalFormDetail.value.tiempoEntrega,
      requiereInstalacion: this.modalFormDetail.value.requiereInstalacion,
      garantia: this.modalFormDetail.value.garantia,
      mantenimiento: this.modalFormDetail.value.mantenimiento
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('cotizacionDetalle', this.authService.token, dto)
        .subscribe(resp => {
          this.reload();
          this.entityModalDetail.hide();
        }, error2 => {
          this.existsError = true;
          this.existsErrorTitle = 'Error al grabar registro.';
          const timer = setTimeout(() => this.existsError = false, 6000);
          console.error(JSON.stringify(error2));
        });

    } else if (this.modalMode === 2) {
      // se insertan los datos modificados con el servicio de edicion
      this.dataService.editEntity('cotizacionDetalle', this.authService.token, this.cotizacionDetail.id, dto)
        .subscribe(resp => {
          this.reload();
          this.entityModalDetail.hide();
        }, error2 => {
          console.error(JSON.stringify(error2));
        });
    }

    // Recarga valores y los muestra en pantalla, queda pendiente pagineo
    this.reload();
    this.entityModalDetail.show();

  }

  selectClient( cliente: Cliente ) {
    this.modalForm.patchValue({ cliente: cliente.nombre, idCliente: cliente.id} );
    this.clientModal.hide();
  }

  selectProduct( producto: Producto ) {
    this.modalFormDetail.patchValue({
      idProducto: producto.id, producto: producto.descripcion,
      descripcion: producto.observaciones, precio: producto.precioVenta,
      marca: producto.marca
    });

    this.productModal.hide();
  }

  ngOnInit() {

  }

  clientList( event ) {
    event.preventDefault();
    this.clientModal.show();
  }

  productList( event ) {
    event.preventDefault();
    this.productModal.show();
  }


}
