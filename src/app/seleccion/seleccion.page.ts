import { Component, OnInit } from "@angular/core";

import { FirebaseService } from "../services/firebase.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { constantes } from "../../constantes/constantes";
import { DataService } from '../services/data.service';

interface StudentData {
  Name: string;
  Age: number;
  Address: string;
}

@Component({
  selector: "app-seleccion",
  templateUrl: "./seleccion.page.html",
  styleUrls: ["./seleccion.page.scss"],
})
export class SeleccionPage implements OnInit {
  studentList = [];
  studentData: StudentData;
  studentForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public router: Router,
    public constantes: constantes,
    private ds: DataService
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      Name: ["", [Validators.required]],
    });

    this.ReadPaciente();

  }

  CreateRecord() {
    // console.log( this.studentForm.controls['Name'].value );
    // console.log( this.studentForm.value );
    this.firebaseService
      .create_paciente(this.studentForm.controls["Name"].value)
      .then((resp) => {
        this.studentForm.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_paciente(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record["Name"] = recordRow.EditName;
    record["Age"] = recordRow.EditAge;
    record["Address"] = recordRow.EditAddress;
    this.firebaseService.update_paciente(recordRow.id, record);
    recordRow.isEdit = false;
    console.log( recordRow.id );
  }

  Enviar(rowID, nombre, pacienteId) {
    // this.paciente = auth.email;
    // this.id = this.correo;

    //this.router.navigateByUrl('/(tabs/tab1)');
    this.constantes.nombre = nombre;
    this.constantes.id = rowID;
    this.ds.setPacienteId( pacienteId );
    this.router.navigate(["/tabs/tab1"]);
  }

  ReadPaciente() {

    this.firebaseService.read_pacientes().snapshotChanges().subscribe( data => {
      this.studentList = data.map( e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
          PacienteId: e.payload.doc.data()['PacienteId']          
        }
      })
    })

  }


}
