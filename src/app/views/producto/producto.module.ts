import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [ProductoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class ProductoModule { }
