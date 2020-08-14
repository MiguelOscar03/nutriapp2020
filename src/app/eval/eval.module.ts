import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvalPageRoutingModule } from './eval-routing.module';

import { EvalPage } from './eval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvalPageRoutingModule
  ],
  declarations: [EvalPage]
})
export class EvalPageModule {}
