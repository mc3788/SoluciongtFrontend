import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Marca} from '../../interface/bo/Marca';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarcaDTO} from '../../interface/dto/MarcaDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  title = '';
  searchText = '';

  submitted = false;


  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  public modalForm: FormGroup;

  marcas: Marca[];
  detail: Marca;

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {
    this.dataService.getAllItemsFromEntity('marca', this.authService.token)
    .subscribe(res => {
      this.marcas = (<Marca[]>res);
    }, error => {
      console.error(JSON.stringify(error));
    });
    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      nombre: ['', Validators.required ]
      });

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Marca');
  }

  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      nombre: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number) {
    this.modalMode = 0;
    this.submitted = false;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('marca', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Marca>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          nombre: [this.detail.nombre]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
    this.entityModal.show();
  }

  openToModify(id: number) {
    this.modalMode = 2;
    this.submitted = false;
    this.title = 'Modificar';
    this.dataService.getEntityDetail('marca', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Marca>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          nombre: [this.detail.nombre]
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

  deleteReg( ) {
    this.dataService.deleteEntity('marca', this.authService.token, this.selId)
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

    const dto: MarcaDTO = {
      nombre: this.modalForm.value.nombre
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('marca', this.authService.token, dto)
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
      this.dataService.editEntity('marca', this.authService.token, this.detail.id, dto)
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

  dismiss() {
      this.entityModal.hide();
  }
  ngOnInit() {
  }
  reload() {
    this.dataService.getAllItemsFromEntity( 'marca', this.authService.token)
      .subscribe(resp => {
        this.marcas = (<Marca[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

}
