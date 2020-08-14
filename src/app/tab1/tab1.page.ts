import { Component } from '@angular/core';
// import { BuiltinVar } from '@angular/compiler';
import { Router } from '@angular/router';

import { constantes } from '../../constantes/constantes';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  paciente: string;
  id: string;
  constructor(public router: Router,     
    public constantes: constantes
    ) {

      this.paciente = this.constantes.nombre;
    
  }


}
