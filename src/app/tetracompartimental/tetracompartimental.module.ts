import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TetracompartimentalPageRoutingModule } from './tetracompartimental-routing.module';

import { TetracompartimentalPage } from './tetracompartimental.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TetracompartimentalPageRoutingModule
  ],
  declarations: [TetracompartimentalPage]
})
export class TetracompartimentalPageModule {}
