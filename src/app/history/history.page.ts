import { Component, OnInit } from '@angular/core';

import { constantes } from '../../constantes/constantes';

import { Router, Data } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";

import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  customerPickerOptions: any;

  clinicHistory = [];

  historyForm: FormGroup;


  docId: string;
  ciudad: string;
  direccion: string;
  sexo: string;
  seguroMedico: string;
  jefeFamilia: string;
  estadoCivil: string;
  integrantes: number;
  ocupacion: string;
  pacienteId: string;
  seguro: string;
  fechaNac: Date;

  paciente: string;

  constructor(public router: Router,     
    public constantes: constantes,
    private fs: FirebaseService,
    private ds: DataService,
    public fb: FormBuilder,
    ) {
      this.customerPickerOptions = {
        buttons: [{
          text: 'Guardar',
          handler: ( e ) =>{
            const fecha = `${e.day.text} ${e.month.value} ${e.year.text}`;
            console.log('Guardar', e);
            console.log( moment().format( fecha ) );
            this.fechaNac = moment(fecha, 'MMM DD, YYYY').toDate();
            console.log( this.fechaNac );
          }
        }, {
          text: 'Cancelar',
          handler: () => console.log( 'Cancelar' )
        }]
      }

      this.paciente = this.constantes.nombre;
      
    }
    
    ngOnInit() {
      this.createForm();
      this.readHistoryInfo();
    
  }

  readHistoryInfo() {

    this.fs.read_clinic_history().snapshotChanges().subscribe( data => {
      this.clinicHistory = data.map( e => {
        return {
          id: e.payload.doc.id,
          ciudad: e.payload.doc.data()['ciudad'],
          direccion: e.payload.doc.data()['direccion'],
          email: e.payload.doc.data()['email'],
          estadoCivil: e.payload.doc.data()['estadoCivil'],
          integrantes: e.payload.doc.data()['integrantes'],
          jefeFamilia: e.payload.doc.data()['jefeFamilia'],
          ocupacion: e.payload.doc.data()['ocupacion'],
          fechaNac: e.payload.doc.data()['fechaNac'],
          seguro: e.payload.doc.data()['seguro'],
          seguroMedico: e.payload.doc.data()['seguroMedico'],
          sexo: e.payload.doc.data()['sexo'],
          pacienteId: e.payload.doc.data()['pacienteId'],
          uid: e.payload.doc.data()['uid']
        }
      });
      // Get value for each field
      if( this.clinicHistory.length > 0 ){
        this.docId = this.clinicHistory[0].id;
        this.ciudad = this.clinicHistory[0].ciudad;
        this.direccion = this.clinicHistory[0].direccion;
        this.sexo = this.clinicHistory[0].sexo;
        this.seguroMedico = this.clinicHistory[0].seguroMedico;
        this.seguro = this.clinicHistory[0].seguro;
        this.jefeFamilia = this.clinicHistory[0].jefeFamilia;
        this.estadoCivil = this.clinicHistory[0].estadoCivil;
        this.integrantes = this.clinicHistory[0].integrantes;
        this.ocupacion = this.clinicHistory[0].ocupacion;
        this.fechaNac = this.clinicHistory[0].fechaNac;
      }

    });
  }


  createForm() {
    this.historyForm = this.fb.group({
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      seguroMedico: ['', [Validators.required]],
      seguro: new FormControl(this.seguro),
      jefeFamilia: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      integrantes: ['', [Validators.required]],
      ocupacion: ['', [Validators.required]],
      fechaNac: ['', Validators.required],
      pacienteId: [this.ds.getPacienteId()]
    })

    console.log( this.ds.getPacienteId() );
  }


  onSave() {
    console.log( this.historyForm.value );
    this.fs.insert_history_info( this.historyForm.value );
    this.router.navigate(['/pacientes']);
  }


  onUpdate() {
    if( this.seguroMedico === 'no' ) {
      this.historyForm.value.seguro = '';
    }
    this.fs.update_history_info( this.docId, this.historyForm.value );
    console.log( this.historyForm.value );
    this.router.navigate(['/pacientes']);
  }

}
