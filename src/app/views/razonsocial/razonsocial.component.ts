import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Razon} from '../../interface/bo/Razon';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RazonDTO} from '../../interface/dto/RazonDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-razonsocial',
  templateUrl: './razonsocial.component.html',
  styleUrls: ['./razonsocial.component.css']
})
export class RazonsocialComponent implements OnInit {
  title = '';
  searchText = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  razones: Razon[];
  detail: Razon;

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {
    this.dataService.getAllItemsFromEntity('razonSocial', this.authService.token)
      .subscribe(res => {
        this.razones = (<Razon[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      direccion: ['', Validators.required],
      representanteLegal: [''],
      nit: [''],
      cuentaBancaria: [''],
      regimenImpuesto: [''],
      telefono: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      representanteFirma: ['', Validators.required],
      numeroCelular: ['', Validators.required],

    });

    this.authService.getAccess().then(access => {
      this.accesos = access.find(a => a.opcion === 'Razon');
    });
  }

  get f() {
    return this.modalForm.controls;
  }

    openToAdd() {
      this.submitted = false;
      this.modalMode = 1;
      this.title = 'Agregar';
      this.modalForm = this.formBuilder.group({
        nombre: [''],
        nombreComercial: [''],
        direccion: [''],
        representanteLegal: [''],
        nit: [''],
        cuentaBancaria: [''],
        regimenImpuesto: [''],
        telefono: [''],
        correoElectronico: [''],
        representanteFirma: [''],
        numeroCelular: [''],
      });
      this.entityModal.show();
    }
    openToVisualy(id: number) {
      this.submitted = false;
      this.modalMode = 0;
      this.title = 'Consultar';

      this.dataService.getEntityDetail('razonSocial', this.authService.token, id)
        .subscribe(resp => {
          // se convierten los datos recuperadps al objeto
          this.detail = (<Razon>resp);

          // se ingresan los valores en el form y validaciones
          this.modalForm = this.formBuilder.group({
            nombre: [this.detail.nombre],
            direccion: [this.detail.direccion],
            nombreComercial: [this.detail.nombreComercial],
            representanteLegal: [this.detail.representanteLegal],
            nit: [this.detail.nit],
            cuentaBancaria: [this.detail.cuentaBancaria],
            regimenImpuesto: [this.detail.regimenImpuesto],
            telefono: [this.detail.telefono],
            correoElectronico: [this.detail.correoElectronico],
            representanteFirma: [this.detail.representanteFirma],
            numeroCelular: [this.detail.numeroCelular]
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

      this.dataService.getEntityDetail('razonSocial', this.authService.token, id)
        .subscribe(resp => {
          // se convierten los datos recuperadps al objeto
          this.detail = (<Razon>resp);

          // se ingresan los valores en el form y validaciones
          this.modalForm = this.formBuilder.group({
            nombre: [this.detail.nombre],
            direccion: [this.detail.direccion],
            nombreComercial: [this.detail.nombreComercial],
            representanteLegal: [this.detail.representanteLegal],
            nit: [this.detail.nit],
            cuentaBancaria: [this.detail.cuentaBancaria],
            regimenImpuesto: [this.detail.regimenImpuesto],
            telefono: [this.detail.telefono],
            correoElectronico: [this.detail.correoElectronico],
            representanteFirma: [this.detail.representanteFirma],
            numeroCelular: [this.detail.numeroCelular]
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
      this.dataService.deleteEntity('razonSocial', this.authService.token, this.selId)
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

      const dto: RazonDTO = {
        nombre: this.modalForm.value.nombre,
        nombreComercial: this.modalForm.value.nombreComercial,
        representanteLegal: this.modalForm.value.representanteLegal,
        nit: this.modalForm.value.nit,
        cuentaBancaria: this.modalForm.value.cuentaBancaria,
        regimenImpuesto: this.modalForm.value.regimenImpuesto,
        telefono: this.modalForm.value.telefono,
        direccion: this.modalForm.value.direccion,
        correoElectronico: this.modalForm.value.correoElectronico,
        representanteFirma: this.modalForm.value.representanteFirma,
        numeroCelular: this.modalForm.value.numeroCelular
      };

      if (this.modalMode === 1) {
        // Servicio para guardar nueva entidad
        this.dataService.insertNewEntity('razonSocial', this.authService.token, dto)
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
        this.dataService.editEntity('razonSocial', this.authService.token, this.detail.id, dto)
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
      this.dataService.getAllItemsFromEntity( 'razonSocial', this.authService.token)
        .subscribe(resp => {
          this.razones = (<Razon[]> resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });
    }

    dismiss() {
        this.entityModal.hide();
    }

  ngOnInit() {
  }

}
