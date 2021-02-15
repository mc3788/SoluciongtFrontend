import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaComponent } from './bodega.component';

const routes: Routes = [{ path: '', component: BodegaComponent,data:{title:'Bodega'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegaRoutingModule { }
