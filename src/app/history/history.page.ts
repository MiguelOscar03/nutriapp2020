import { Component, OnInit } from '@angular/core';

import { constantes } from '../../constantes/constantes';

import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  seguro: boolean = true;

  paciente: string;
  id: string;
  constructor(public router: Router,     
    public constantes: constantes
    ) {

      this.paciente = this.constantes.nombre;
    
  }

  ngOnInit() {
  }

}
