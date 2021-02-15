import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LetraComponent } from './letra.component';

const routes: Routes = [{ path: '', component: LetraComponent, data:{title:'Series'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LetraRoutingModule { }
