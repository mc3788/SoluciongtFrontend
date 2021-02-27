import {NgModule} from '@angular/core';
import {FormatAmountPipe} from './format-amount.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    FormatAmountPipe
  ],
  exports: [
    FormatAmountPipe
  ],
  providers: [
    FormatAmountPipe
  ]
})
export class CustomPipesModule {
}
