import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import {DirectivesModule} from '../../directives/directives.module';
import {PipesModule} from '../../containers/pipes/pipes.module';

@NgModule({
  declarations: [ContactoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactoRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class ContactoModule { }
