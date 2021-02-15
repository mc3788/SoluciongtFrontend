import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Acceso} from '../../interface/bo/Acceso';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccesoDTO} from '../../interface/dto/AccesoDTO';
import {Perfil} from '../../interface/bo/Perfil';
import {AuthService} from '../../services/auth.service';
import {Opcion} from '../../interface/bo/Opcion';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit, OnDestroy {

  status: { isOpen: boolean } = { isOpen: false };

  title = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  accesos1: Acceso[];
  detail: Acceso;
  perfiles: Perfil[];
  opciones: Opcion[];

  public accesos: Acceso;

  selId: number;
  selName: string;
  selName2: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {

    this.dataService.getAllItemsFromEntity('acceso', this.authService.token)
    .subscribe(res => {
      this.accesos1 = (<Acceso[]>res);
    }, error => {
      console.error(error);
      this.dataService.validError( error );
    });
    this.dataService.getAllItemsFromEntity( 'perfil', this.authService.token )
        .subscribe( resp => {
          this.perfiles = (<Perfil[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

        this.dataService.getAllItemsFromEntity( 'opcion', this.authService.token )
        .subscribe( resp => {
          this.opciones = (<Opcion[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

     // Inicializa el form construyendolo con los campos
     this.modalForm = this.formBuilder.group({
      perfil: ['', Validators.required],
      opcion: ['', Validators.required],
      alta: [''],
      baja: [''],
      cambio: [''],
      consulta: ['']
    });

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Accesos');
  }

  ngOnInit() {
  }

  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      perfil: [''],
      opcion: [''],
      alta: [''],
      baja: [''],
      cambio: [''],
      consulta: ['']
    });
    this.entityModal.show();
  }

  openToModify(id: number) {
    this.submitted = false;
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('acceso', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Acceso>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          perfil: [this.detail.idPerfil],
          opcion: [this.detail.idOpcion],
          alta: [this.detail.alta],
          baja: [this.detail.baja],
          cambio: [this.detail.cambio],
          consulta: [this.detail.consulta]
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

    this.dataService.getEntityDetail('acceso', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Acceso>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          perfil: [this.detail.idPerfil],
          opcion: [this.detail.idOpcion],
          alta: [this.detail.alta],
          baja: [this.detail.baja],
          cambio: [this.detail.cambio],
          consulta: [this.detail.consulta]
        });
        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });

    this.entityModal.show();
  }

  openToDelete( id: number, name: string, namePerfil: string) {
    this.submitted = false;
    this.selId = id;
    this.selName = name;
    this.selName2 = namePerfil;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('acceso', this.authService.token, this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  dismiss() {
      this.entityModal.hide();
  }

  saveChanges() {

    this.submitted = true;

    if (this.modalForm.invalid) {
      return;
    }

    const dto: AccesoDTO = {
      idPerfil: this.modalForm.value.perfil,
      idOpcion: this.modalForm.value.opcion,
      alta: this.modalForm.value.alta,
      baja: this.modalForm.value.baja,
      cambio: this.modalForm.value.cambio,
      consulta: this.modalForm.value.consulta
    };


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('acceso', this.authService.token, dto)
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
      this.dataService.editEntity('acceso', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'acceso', this.authService.token)
      .subscribe(resp => {
        this.accesos1 = (<Acceso[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

  ngOnDestroy () {
    this.status.isOpen = false;
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }




}
