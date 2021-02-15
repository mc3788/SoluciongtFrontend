import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import {DirectivesModule} from '../../directives/directives.module';
import {PipesModule} from '../../containers/pipes/pipes.module';

@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class CategoriaModule { }
