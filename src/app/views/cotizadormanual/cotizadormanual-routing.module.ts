import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizadormanualComponent } from './cotizadormanual.component';

const routes: Routes = [{ path: '', component: CotizadormanualComponent, data:{title:'Cotizador Manual'}  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizadormanualRoutingModule { }
