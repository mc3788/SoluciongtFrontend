import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RazonsocialComponent } from './razonsocial.component';

const routes: Routes = [{ path: '', component: RazonsocialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RazonsocialRoutingModule { }
