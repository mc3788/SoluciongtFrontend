import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizadorautomaticoComponent } from './cotizadorautomatico.component';

const routes: Routes = [{ path: '', component: CotizadorautomaticoComponent, data:{title:'Cotizador Automático'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizadorautomaticoRoutingModule { }
