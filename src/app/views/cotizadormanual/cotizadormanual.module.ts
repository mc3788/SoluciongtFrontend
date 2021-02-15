import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CotizadormanualRoutingModule } from './cotizadormanual-routing.module';
import { CotizadormanualComponent } from './cotizadormanual.component';
import {DirectivesModule} from '../../directives/directives.module';
import {PipesModule} from '../../containers/pipes/pipes.module';

@NgModule({
  declarations: [CotizadormanualComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CotizadormanualRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class CotizadormanualModule { }
