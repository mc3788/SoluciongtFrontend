import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../containers/pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    DashboardRoutingModule,
    DirectivesModule,
    ChartsModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
