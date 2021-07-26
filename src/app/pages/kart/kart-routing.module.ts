import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KartPage } from './kart.page';

const routes: Routes = [
  {
    path: '',
    component: KartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KartPageRoutingModule {}
