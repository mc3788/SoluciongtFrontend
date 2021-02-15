import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {PipesModule} from '../../containers/pipes/pipes.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class UsuarioModule { }
