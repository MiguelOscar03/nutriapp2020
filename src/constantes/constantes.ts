import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class constantes {

  nombre: string;
  id: string;
  email: string;
  uid: string;
  constructor() {

  }

}