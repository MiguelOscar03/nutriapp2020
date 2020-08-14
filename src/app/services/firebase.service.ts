// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Paciente';

  constructor(
    private firestore: AngularFirestore,
    private ds: DataService
  ) { }

  data = {
    Name: '',
    uid: '',
    email: ''
  };

  create_paciente( record ) {
    this.data.Name = record;
    this.data.uid = this.ds.getData().uid;
    this.data.email = this.ds.getData().email;
    return this.firestore.collection( this.collectionName ).add( this.data );
  }

  read_pacientes() {

    return this.firestore.collection(this.collectionName, query => query.where('email', '==', this.ds.getData().email ).orderBy( 'Name', 'asc') );
    
    // this.usuarios = this.firestore.collection(this.collectionName).snapshotChanges();

  }

  update_paciente(recordID, record) {
    this.firestore.doc(`${this.collectionName}/${recordID}`).update( record );
  }

  delete_paciente(record_id) {
    this.firestore.doc(`${this.collectionName}/${record_id}`).delete();
  }
}