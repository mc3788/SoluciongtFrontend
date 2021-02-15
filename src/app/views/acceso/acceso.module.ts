import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {PipesModule} from '../../containers/pipes/pipes.module';
import { AccesoRoutingModule } from './acceso-routing.module';
import { AccesoComponent } from './acceso.component';
import {DirectivesModule} from '../../directives/directives.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AccesoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccesoRoutingModule,
    DirectivesModule,
    PipesModule,
    BsDropdownModule.forRoot()
  ]
})
export class AccesoModule { }
