import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KartPageRoutingModule } from './kart-routing.module';

import { KartPage } from './kart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KartPageRoutingModule
  ],
  declarations: [KartPage]
})
export class KartPageModule {}
