import { Component, OnInit, ViewChild  } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Letra} from '../../interface/bo/Letra';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LetraDTO} from '../../interface/dto/LetraDTO';
import { Usuario} from '../../interface/bo/Usuario';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import {Opcion} from '../../interface/bo/Opcion';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {

  title = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;
  existsError = false;
  existsErrorTitle = '';

  searchText = '';

// objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  usuarios: Usuario[];
  letras: Letra[];
  detail: Letra;

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('visualModal') public visualModal: ModalDirective;

  constructor(private dataService: DataService,
    public formBuilder: FormBuilder,
    private authService: AuthService ) {
      this.dataService.getAllItemsFromEntity( 'serie', this.authService.token )
      .subscribe( resp => {
        this.letras = (<Letra[]>resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });

      this.dataService.getAllItemsFromEntity( 'usuario', this.authService.token)
      .subscribe( resp => {
        this.usuarios = (<Usuario[]>resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });


    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      serie: ['', Validators.required ],
      usuario: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Series');
      
     }
  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      serie: [''],
      usuario: [''],
      status: ['']
    });
    this.entityModal.show();
  }

  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('serie', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Letra>resp);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          serie: [this.detail.serie],
          usuario: [this.detail.idUsuario],
          status: [this.detail.status],
          
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

    this.dataService.getEntityDetail('serie', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Letra>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          serie: [this.detail.serie],
          usuario: [this.detail.idUsuario],
          status: [this.detail.status]
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
    this.dataService.deleteEntity('serie', this.authService.token, this.selId)
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
    
    const dto: LetraDTO = {
      serie: this.modalForm.value.serie,
      idUsuario: this.modalForm.value.usuario,    
      status: this.modalForm.value.status
    };
    
    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('serie', this.authService.token, dto)
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
      this.dataService.editEntity('serie', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'serie', this.authService.token)
      .subscribe(resp => {
        this.letras = (<Letra[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

}
