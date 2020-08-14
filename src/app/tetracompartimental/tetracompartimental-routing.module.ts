import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TetracompartimentalPage } from './tetracompartimental.page';

const routes: Routes = [
  {
    path: '',
    component: TetracompartimentalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TetracompartimentalPageRoutingModule {}
