import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './marca.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [MarcaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarcaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class MarcaModule { }
