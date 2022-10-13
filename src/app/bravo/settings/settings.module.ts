import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }]),
    SharedModule,
  ],
})
export class SettingsPageModule {}
