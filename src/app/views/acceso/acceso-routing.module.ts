import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoComponent } from './acceso.component';

const routes: Routes = [{ path: '', component: AccesoComponent,data:{title:'Accesos'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoRoutingModule { }
