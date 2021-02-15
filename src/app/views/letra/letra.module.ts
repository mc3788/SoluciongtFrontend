import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { LetraRoutingModule } from './letra-routing.module';
import { LetraComponent } from './letra.component';
import {DirectivesModule} from '../../directives/directives.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [LetraComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LetraRoutingModule,
    DirectivesModule,
    PipesModule,
    BsDropdownModule.forRoot()
  ]
})
export class LetraModule { }
