import { Component, OnInit } from "@angular/core";

import { FirebaseService } from "../services/firebase.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { constantes } from "../../constantes/constantes";
import { DataService } from "../services/data.service";

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
    // private data: DataService
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {
    // this.studentForm = this.fb.group({
    //   Name: ['', [Validators.required]],
    //   Age: ['', [Validators.required]],
    //   Address: ['', [Validators.required]]
    // })
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
  }

  Enviar(rowID, nombre) {
    // this.paciente = auth.email;
    // this.id = this.correo;

    //this.router.navigateByUrl('/(tabs/tab1)');
    this.constantes.nombre = nombre;
    this.constantes.id = rowID;
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
          Address: e.payload.doc.data()['Address']          
        }
      })
    })


    // this.firebaseService.read_pacientes().subscribe((data) => {
    //   this.studentList = data.map((e) => {
    //       return {
    //         id: e.payload.doc.id,
    //         isEdit: false,
    //         Name: e.payload.doc.data()['Name'],
    //         Age: e.payload.doc.data()['Age'],
    //         Address: e.payload.doc.data()['Address']
    //       }; // end return
    //   });
    // });

    // this.firebaseService.read_pacientes();
    

    // this.firebaseService.read_pacientes().get()
    // .then( e => {
    //   this.studentList = e.docChanges().map( data => {
    //     return {
    //       id: data.doc.id,
    //       isEdit: false,
    //       Name: data.doc.data()['Name'],
    //       Age: data.doc.data()['Age'],
    //       Address: data.doc.data()['Address']
    //     }
    //   })
    // })

    // this.firebaseService.read_pacientes().get()
    // .then( e => {
    //   this.studentList = e.docs.map( data => {
    //     return {
    //       id: data.id,
    //       isEdit: false,
    //       Name: data.data()['Name'],
    //       Age: data.data()['Age'],
    //       Address: data.data()['Address']
    //     }
    //   })
    // })


    // this.studentList = []
    // this.firebaseService.read_pacientes().onSnapshot( data => {
    //   data.forEach( val => {
    //     this.studentList.push({
    //       id: val.id,
    //       isEdit: false,
    //       Name: val.data()['Name'],
    //       Age: val.data()['Age'],
    //       Address: val.data()['Address']          
    //     })


  }


}
