import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [ClienteComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClienteRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class ClienteModule { }
