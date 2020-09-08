// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './data.service';
import { Md5 } from 'ts-md5/dist/md5';
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
    email: '',
    PacienteId: Md5.hashStr( Date().toString() )
  };

  create_paciente( record:string ) {
    this.data.Name = record;
    this.data.uid = this.ds.getData().uid;
    this.data.email = this.ds.getData().email;
    this.ds.setPacienteId( this.data.PacienteId );
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

  insert_test_info( record ) {
    this.firestore.collection( 'testPaciente' ).add( record );
  }

  read_history() {
    return this.firestore.collection('testPaciente', query => query.where('pacienteId', '==', this.ds.getPacienteId() ));
  }

  insert_history_info( record ) {
    this.firestore.collection('clinicHistory').add( record );
  }

  update_history_info( recordID, record ) {   
    this.firestore.doc(`clinicHistory/${recordID}`).update( record );
  }

  read_clinic_history() {
    return this.firestore.collection('clinicHistory', query => query.where('pacienteId', '==', this.ds.getPacienteId() ));
  }
}