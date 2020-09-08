import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUser = {
    uid: '',
    email: '',
    pacienteId: ''
  };

  constructor() { }

  setData( uid, email ) {
    this.dataUser.uid = uid;
    this.dataUser.email = email;
  }

  getData(){
    return this.dataUser;
  }

  setPacienteId( pacienteId ) {
    this.dataUser.pacienteId = pacienteId;
  }

  getPacienteId() {
    return this.dataUser.pacienteId;
  }
}
