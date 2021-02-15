import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizadorautomaticoRoutingModule } from './cotizadorautomatico-routing.module';
import { CotizadorautomaticoComponent } from './cotizadorautomatico.component';


@NgModule({
  declarations: [CotizadorautomaticoComponent],
  imports: [
    CommonModule,
    CotizadorautomaticoRoutingModule
  ]
})
export class CotizadorautomaticoModule { }
