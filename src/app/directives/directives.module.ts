import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DisableControlDirective} from './disable-control';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DisableControlDirective
  ],
  exports: [
    DisableControlDirective
  ]
})
export class DirectivesModule {
}
