import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionPageRoutingModule } from './seleccion-routing.module';

import { SeleccionPage } from './seleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SeleccionPageRoutingModule
  ],
  declarations: [SeleccionPage]
})
export class SeleccionPageModule {}
