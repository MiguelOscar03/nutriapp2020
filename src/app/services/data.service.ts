import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUser = {
    uid: '',
    email: ''
  };

  constructor() { }

  setData( uid, email ) {
    this.dataUser.uid = uid;
    this.dataUser.email = email;
  }

  getData(){
    return this.dataUser;
  }
}
