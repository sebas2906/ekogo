import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitConfigPageRoutingModule } from './init-config-routing.module';

import { InitConfigPage } from './init-config.page';
import { MapCardComponent } from '../../components/map-card/map-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitConfigPageRoutingModule
  ],
  declarations: [InitConfigPage,MapCardComponent]
})
export class InitConfigPageModule {}
