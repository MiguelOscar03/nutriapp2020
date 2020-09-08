import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
