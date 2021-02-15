import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { RazonsocialRoutingModule } from './razonsocial-routing.module';
import { RazonsocialComponent } from './razonsocial.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [RazonsocialComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RazonsocialRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class RazonsocialModule { }
