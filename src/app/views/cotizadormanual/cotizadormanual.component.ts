import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Cotizacion} from '../../interface/bo/Cotizacion';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CotizacionDTO} from '../../interface/dto/CotizacionDTO';
import {CotizacionDetalleDTO} from '../../interface/dto/CotizacionDetalleDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import { Cliente } from '../../interface/bo/Cliente';
import { Letra } from '../../interface/bo/Letra';
import { Usuario } from '../../interface/bo/Usuario';
import { Producto } from '../../interface/bo/Producto';
import { CreaPdf } from '../../utils/crea-pdf';


@Component({
  selector: 'app-cotizadormanual',
  templateUrl: './cotizadormanual.component.html',
  styleUrls: ['./cotizadormanual.component.css']
})
export class CotizadormanualComponent implements OnInit {

  title = '';
  searchText = '';

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
  clientes: Cliente[];
  productos: Producto[];
  usuario: Usuario;
  letra: Letra;


  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('entityModalDetail') public entityModalDetail: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private creaPdf: CreaPdf) {
      this.dataService.getAllItemsFromEntity('cotizacionEncabezado', this.authService.token)
      .subscribe(res => {
        this.cotizaciones = (<Cotizacion[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });
      this.dataService.getAllItemsFromEntity( 'cliente', this.authService.token)
      .subscribe( resp => {
        this.clientes = (<Cliente[]>resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });

      this.dataService.getAllItemsFromEntity( 'producto', this.authService.token)
      .subscribe( resp => {
        this.productos = (<Producto[]>resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });

      this.dataService.getEntityDetail('usuario/getByUserName', this.authService.token, this.authService.userId)
        .subscribe(resp => {
          // se convierten los datos recuperadps al objeto
          this.usuario = (<Usuario>resp);
          this.dataService.getEntityDetail('serie/getByUserId', this.authService.token, this.usuario.id)
          .subscribe( resp => {
            this.letra = (<Letra>resp);
          }, error => {
            console.error( JSON.stringify(error) );
          });
        }, error2 => {
          console.error(JSON.stringify(error2));
        });


       // Inicializa el form construyendolo con los campos
       this.modalForm = this.formBuilder.group({
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
        serie: [''],
        tipo: [''],
        idUsuario: ['']

      });

      // Inicializa el form construyendolo con los campos
      this.modalFormDetail = this.formBuilder.group({
        numeroCotizacion: [],
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

      this.accesos = this.authService.accesos.find( a => a.opcion === 'Manual');

     }

    get f() { return this.modalForm.controls; }
    get fd() { return this.modalFormDetail.controls; }

    openToAdd() {
      this.submitted = false;
      this.modalMode = 1;
      this.title = 'Agregar';
      this.modalForm = this.formBuilder.group({
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
        tipo: [''],
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
            cliente: [this.detail.idCliente, Validators.required],
            fecha: [this.detail.fecha, Validators.required],
            numeroNog: [this.detail.numeroNOG],
            evento: [this.detail.evento],
            pedido: [this.detail.pedido],
            codigoIgss: [this.detail.codigoIGSS],
            codigoPpr: [this.detail.codigoPPR],
            oferta: [this.detail.oferta],
            razon: [this.detail.idRazonSocial],
            tipo: [this.detail.tipo],
          });

          this.entityModal.show();
        }, error2 => {
          console.error(JSON.stringify(error2));
        });
    }

    openToVisualy( id: number ) {
      this.submitted = false;
      this.modalMode = 0;
      this.title = 'Consultar';

      this.dataService.getEntityDetail('cotizacionEncabezado', this.authService.token, id)
        .subscribe(resp => {
          // se convierten los datos recuperadps al objeto
          this.detail = (<Cotizacion>resp);

          // se ingresan los valores en el form y validaciones
          this.modalForm = this.formBuilder.group({
            cliente: [this.detail.idCliente],
            serie: [this.detail.idSerie],
            razon: [this.detail.idRazonSocial],
            fecha: [this.detail.fecha],
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

      this.entityModal.show();
    }

    openToDelete(id: number, name: string) {
      this.submitted = false;
      this.selId = id;
      this.selName = name;
      this.title = 'Eliminar';
      this.deleteModal.show();
    }
    dismiss() {
        this.entityModal.hide();
    }
    deleteReg( ) {
      this.dataService.deleteEntity('cotizacionEncabezado', this.authService.token, this.selId)
        .subscribe(resp => {
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
        idCliente: this.modalForm.value.cliente,
        fecha: this.modalForm.value.fecha,
        numero: 1,
        numeroNOG: this.modalForm.value.numeroNog,
        evento: this.modalForm.value.evento,
        pedido: this.modalForm.value.pedido,
        codigoIGSS: this.modalForm.value.codigoIgss,
        codigoPPR: this.modalForm.value.codigoPpr,
        oferta: this.modalForm.value.oferta,
        idRazonSocial: this.modalForm.value.razon,
        tipo: this.modalForm.value.tipo,
        idSerie: this.letra.id,
        idUsuario: this.usuario.id
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
      this.dataService.getAllItemsFromEntity( 'cotizacionEncabezado', this.authService.token)
        .subscribe(resp => {
          this.cotizaciones = (<Cotizacion[]> resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });
    }

    openToDetail(id: number, numeroCot: number) {
      this.submitted = false;
      this.modalMode = 1;
      this.title = 'Agregar Detalle.ts';
      this.modalFormDetail = this.formBuilder.group({
        numeroCotizacion:[numeroCot],
        producto: ['', Validators.required],
        descripcion: ['', Validators.required],
        marca: [''],
        cantidad: [''],
        precio: [''],
        tiempoEntrega: [''],
        requiereInstalacion: [''],
        garantia: [],
        mantenimiento: ['']
      });
      this.entityModalDetail.show();
    }

  print(id: number) {

    this.dataService.getEntityDetail('cotizacionEncabezado', this.authService.token, id)
      .subscribe(resp => {
        console.log( <Cotizacion>resp );

        this.creaPdf.createDocument( <Cotizacion> resp );

      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

    saveChangesDetail() {
      this.submitted = true;

      if (this.modalFormDetail.invalid) {
        return;
      }

      const dto: CotizacionDetalleDTO = {
        idCotizacion : this.modalFormDetail.value.numeroCotizacion,
        idProducto : this.modalFormDetail.value.producto,
        descripcion : this.modalFormDetail.value.descripcion,
        marca : this.modalFormDetail.value.marca,
        cantidad : this.modalFormDetail.value.cantidad,
        precio : this.modalFormDetail.value.precio,
        tiempoEntrega: this.modalFormDetail.value.tiempoEntrega,
        requiereInstalacion: this.modalFormDetail.value.requiereInstalacion,
        garantia : this.modalFormDetail.value.garantia,
        mantenimiento : this.modalFormDetail.value.mantenimiento
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
        this.dataService.editEntity('cotizacionDetalle', this.authService.token, this.detail.id, dto)
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
  ngOnInit() {
  }

}
