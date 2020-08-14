import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicompartimentalPageRoutingModule } from './bicompartimental-routing.module';

import { BicompartimentalPage } from './bicompartimental.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicompartimentalPageRoutingModule
  ],
  declarations: [BicompartimentalPage]
})
export class BicompartimentalPageModule {}
