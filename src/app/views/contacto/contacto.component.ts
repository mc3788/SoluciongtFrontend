import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Contacto} from '../../interface/bo/Contacto';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactoDTO} from '../../interface/dto/ContactoDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import { Cliente } from '../../interface/bo/Cliente';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  title = '';
  searchText = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  contactos: Contacto[];
  detail: Contacto;
  clientes: Cliente[];

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
    public formBuilder: FormBuilder,
    private authService: AuthService) {
      this.dataService.getAllItemsFromEntity('contacto', this.authService.token)
      .subscribe(res => {
        this.contactos = (<Contacto[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });
      this.dataService.getAllItemsFromEntity( 'cliente', this.authService.token)
      .subscribe( resp => {
        this.clientes = (<Cliente[]>resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });

       // Inicializa el form construyendolo con los campos
       this.modalForm = this.formBuilder.group({
        cliente: ['', Validators.required],
        nombre: ['', Validators.required],
        telefono: [''],
        direccion: [''],
        observaciones: ['']

      });
    this.authService.getAccess().then( access => {
      this.accesos = access.find(a => a.opcion === 'Contactos');
    });

  }
  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      cliente: [''],
      nombre: [''],
      telefono: [''],
      direccion: [''],
      observaciones: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('contacto', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Contacto>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          cliente: [this.detail.idCliente],
          nombre: [this.detail.nombre],
          telefono: [this.detail.telefono],
          direccion: [this.detail.direccion],
          observaciones: [this.detail.observaciones]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });

    this.entityModal.show();
  }
  openToModify(id: number) {
    this.submitted = false;
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('contacto', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Contacto>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          cliente: [this.detail.idCliente],
          nombre: [this.detail.nombre],
          telefono: [this.detail.telefono],
          direccion: [this.detail.direccion],
          observaciones: [this.detail.observaciones]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
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
    this.dataService.deleteEntity('contacto', this.authService.token, this.selId)
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

    const dto: ContactoDTO = {
      idCliente: this.modalForm.value.cliente,
      nit: this.modalForm.value.nit,
      nombre: this.modalForm.value.nombre,
      telefono: this.modalForm.value.telefono,
      direccion: this.modalForm.value.direccion,
      observaciones: this.modalForm.value.observaciones
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('contacto', this.authService.token, dto)
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
      this.dataService.editEntity('contacto', this.authService.token, this.detail.id, dto)
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

  ngOnInit() {
  }

  reload() {
    this.dataService.getAllItemsFromEntity( 'contacto', this.authService.token)
      .subscribe(resp => {
        this.contactos = (<Contacto[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

}
