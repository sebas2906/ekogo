import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitConfigPage } from './init-config.page';

const routes: Routes = [
  {
    path: '',
    component: InitConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitConfigPageRoutingModule {}
