import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { BodegaRoutingModule } from './bodega-routing.module';
import { BodegaComponent } from './bodega.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [BodegaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BodegaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class BodegaModule { }
