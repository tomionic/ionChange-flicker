import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NoRippleDirective } from './no-ripple.directive';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    NoRippleDirective,
    PageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    NoRippleDirective,
    PageComponent,
  ],
})
export class SharedModule {}
