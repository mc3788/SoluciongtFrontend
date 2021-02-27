import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Bodega} from '../../interface/bo/Bodega';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BodegaDTO} from '../../interface/dto/BodegaDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {
  title = '';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;
  searchText = '';

  submitted = false;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  bodegas: Bodega[];
  detail: Bodega;

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;


  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService ) {
      this.dataService.getAllItemsFromEntity('bodega', this.authService.token)
      .subscribe(res => {
        this.bodegas = (<Bodega[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      observaciones: [''],
      estado: [0]
    });

    this.authService.getAccess().then( access => {
      this.accesos = access.find(a => a.opcion === 'Bodegas');
    });

  }

  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.modalMode = 1;
    this.submitted = false;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: [''],
      estado: [0]
    });

    this.entityModal.show();
  }

  openToVisualy(id: number) {
    this.modalMode = 0;
    this.title = 'Consultar';
    this.submitted = false;

    this.dataService.getEntityDetail('bodega', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Bodega>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          observaciones: [this.detail.observaciones],
          estado: [0]

        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });

    this.entityModal.show();
  }

  openToModify(id: number) {
    this.modalMode = 2;
    this.title = 'Modificar';
    this.submitted = false;
    this.dataService.getEntityDetail('bodega', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Bodega>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          observaciones: [this.detail.observaciones],
          estado: [this.detail.estado]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  openToDelete(id: number, name: string) {
    this.selId = id;
    this.selName = name;
    this.submitted = false;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  dismiss() {
      this.entityModal.hide();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('bodega', this.authService.token, this.selId)
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

    const dto: BodegaDTO = {
      descripcion: this.modalForm.value.descripcion,
      observaciones: this.modalForm.value.descripcion,
      estado: this.modalForm.value.estado
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('bodega', this.authService.token, dto)
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
      this.dataService.editEntity('bodega', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'bodega', this.authService.token )
      .subscribe(resp => {
        this.bodegas = (<Bodega[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }


  ngOnInit() {
  }

}
