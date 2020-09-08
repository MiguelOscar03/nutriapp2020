import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  testForm: FormGroup;
  infoForm: object[];

  clinicHistory = [];
  docId: string;
  sexo: string;
  edad: number;
  fechaNac: Date;
  numeroRondas: number;

  formValues: {
    Masa,
    Talla,
    TallaSentado,
    BrazosEnvergadura,
    Triceps,
    Subescapular,
    Biceps,
    Pectoral,
    Axilar,
    Cresta,
    Supraespinal,
    Abdominal,
    Muslo,
    Pierna,
    Cabeza,
    Cuello,
    BrazoRelajado,
    BrazoFlexionado,
    Antebrazo,
    Muneca,
    Torax,
    Cintura,
    Caderas,
    MusloGluteo,
    MusloMedio,
    PiernaPerimetro,
    Tobillo,
    Acromiale,
    Radiale,
    Stylion,
    AlturaIlloespinal,
    AlturaTrochanterion,
    Trochanterion,
    AlturaTibiale,
    Pie,
    Tibiale,
    Biacromial,
    Antero,
    Biileocrestal,
    TranversoTorax,
    AnteroPosterior,
    Humero,
    Biestiloideo,
    Femur,
    Bimaleolar,
    Email
  };
  
  pacienteId: string;

  enviar: {
    fecha,
    email,
    nRondas,    
    Slaughter,
    Yuhasz,
    GrasaCarter,
    Faulkner,
    // Aristizabal2018,
    // Aristizabal2019,
    DurninRahama,
    // JacsonCols,
    DurningWomersley,
    // JacksonPollock
    pacienteId
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private ds: DataService,
    private fs: FirebaseService
  ) { 
    this.createForm();
    this.pacienteId = this.ds.getPacienteId();

    this.fs.read_clinic_history().snapshotChanges().subscribe( data => {
      this.clinicHistory = data.map( e => {
        return {
          id: e.payload.doc.id,
          fechaNac: e.payload.doc.data()['fechaNac'],
          sexo: e.payload.doc.data()['sexo']
        }
      });

      // Get values sexo, id, fecha nacimiento
      if( this.clinicHistory.length > 0)  {
          this.docId = this.clinicHistory[0].id;
          this.sexo = this.clinicHistory[0].sexo;
          this.fechaNac = this.clinicHistory[0].fechaNac;
      }
    });

  }

  ngOnInit() {
    this.infoForm = [];
    moment.locale('es');

    setTimeout(() => {
      if( this.docId === undefined ) {
        // this.getSexo();
        // this.getFechaNac();
        this.alertHistorialClinico();
      } else {
        this.getEdad();
      }
      console.log( this.sexo );
      
    }, 500);
    
    
  }

  createForm() {
    this.testForm = this.fb.group({
      Masa: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Talla: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      TallaSentado: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      BrazosEnvergadura: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Triceps: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Subescapular: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Biceps: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Pectoral: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Axilar: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Cresta: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Supraespinal: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Abdominal: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Muslo: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Pierna: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Cabeza: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Cuello: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      BrazoRelajado: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      BrazoFlexionado: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Antebrazo: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Muneca: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Torax: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Cintura: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Caderas: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      MusloGluteo: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      MusloMedio: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      PiernaPerimetro: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Tobillo: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Acromiale: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Radiale: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Stylion: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      AlturaIlloespinal: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      AlturaTrochanterion: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Trochanterion: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      AlturaTibiale: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Pie: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Tibiale: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Biacromial: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Antero: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Biileocrestal: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      TranversoTorax: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      AnteroPosterior: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Humero: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Biestiloideo: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Femur: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      Bimaleolar: ['', [Validators.required, Validators.min(0), Validators.max(999)]]
    })
  }

  onAdd() {

    this.formValues = {
      Masa: this.testForm.controls['Masa'].value,
      Talla: this.testForm.controls['Talla'].value,
      TallaSentado: this.testForm.controls['TallaSentado'].value,
      BrazosEnvergadura: this.testForm.controls['BrazosEnvergadura'],
      Triceps: this.testForm.controls['Triceps'].value,
      Subescapular: this.testForm.controls['Subescapular'].value,
      Biceps: this.testForm.controls['Biceps'].value,
      Pectoral: this.testForm.controls['Pectoral'].value,
      Axilar: this.testForm.controls['Axilar'].value,
      Cresta: this.testForm.controls['Cresta'].value,
      Supraespinal: this.testForm.controls['Supraespinal'].value,
      Abdominal: this.testForm.controls['Abdominal'].value,
      Muslo: this.testForm.controls['Muslo'].value,
      Pierna: this.testForm.controls['Pierna'].value,
      Cabeza: this.testForm.controls['Cabeza'].value,
      Cuello: this.testForm.controls['Cuello'].value,
      BrazoRelajado: this.testForm.controls['BrazoRelajado'],
      BrazoFlexionado: this.testForm.controls['BrazoFlexionado'].value,
      Antebrazo: this.testForm.controls['Antebrazo'].value,
      Muneca: this.testForm.controls['Muneca'].value,
      Torax: this.testForm.controls['Torax'].value,
      Cintura: this.testForm.controls['Cintura'].value,
      Caderas: this.testForm.controls['Caderas'].value,
      MusloGluteo: this.testForm.controls['MusloGluteo'].value,
      MusloMedio: this.testForm.controls['MusloMedio'].value,
      PiernaPerimetro: this.testForm.controls['PiernaPerimetro'].value,
      Tobillo: this.testForm.controls['Tobillo'].value,
      Acromiale: this.testForm.controls['Acromiale'].value,
      Radiale: this.testForm.controls['Radiale'].value,
      Stylion: this.testForm.controls['Stylion'].value,
      AlturaIlloespinal: this.testForm.controls['AlturaIlloespinal'].value,
      AlturaTrochanterion: this.testForm.controls['AlturaTrochanterion'].value,
      Trochanterion: this.testForm.controls['Trochanterion'].value,
      AlturaTibiale: this.testForm.controls['AlturaTibiale'].value,
      Pie: this.testForm.controls['Pie'].value,
      Tibiale: this.testForm.controls['Tibiale'].value,
      Biacromial: this.testForm.controls['Biacromial'].value,
      Antero: this.testForm.controls['Antero'].value,
      Biileocrestal: this.testForm.controls['Biileocrestal'].value,
      TranversoTorax: this.testForm.controls['TranversoTorax'].value,
      AnteroPosterior: this.testForm.controls['AnteroPosterior'].value,
      Humero: this.testForm.controls['Humero'].value,
      Biestiloideo: this.testForm.controls['Biestiloideo'].value,
      Femur: this.testForm.controls['Femur'].value,
      Bimaleolar: this.testForm.controls['Bimaleolar'].value,
      Email: this.ds.getData().email
    }

    
    this.alertCiclo('¿Desea hacer otro ciclo?');
    
  }

  
  // getEdad
  getEdad() {
    this.fechaNac = new Date( this.fechaNac );
    const fechaAct = moment().year();
    this.edad = fechaAct - this.fechaNac.getFullYear();
  }


  // Create alerts
  async alertCiclo( message:string ) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
          this.infoForm.push( this.formValues );
          // this.infoForm.forEach( val => {
          //   this.fs.insert_test_info( val );
          // });
          this.testForm.reset();
          // this.router.navigate(['/tabs/tab2']);
          this.calculate();
        }
      }, {
        text: 'Si',
        handler: () => {
          this.infoForm.push( this.formValues );
          this.testForm.reset();
        }
      }]
    });
    
    await alert.present();
  }

  async alertHistorialClinico() {
    const alert = await this.alertController.create({
      message: 'Necesita llenar el historial clinico primero',
      buttons: [
        {
          text: 'ok',
          handler: () => this.router.navigate(['/tabs/history'])
        },
        {
          text: 'Cancelar',
          handler: () => this.router.navigate(['/tabs/history'])
        }
      ]
    });
    await alert.present();
  }

  async getSexo( ) {
    const alert = await this.alertController.create({
      header: 'Sexo',
      message: 'Ingresa el sexo:',
      inputs: [
        {
          name: 'sexo',
          type: 'radio',
          value: 'M',
          label: 'Masculino'
        },
        {
          name: 'sexo',
          type: 'radio',
          value: 'F',
          label: 'Femenino'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: ( data ) => {
            this.sexo = data;
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.router.navigate(['/pacientes']);
          }
        }
      ]

    });
    
    await alert.present();
  }

  async getFechaNac () {
    const alert = await this.alertController.create({
      header: 'Fecha de nacimiento:',
      message: 'Ingresa tu fecha de nacimiento:',
      inputs: [
        {
          name: 'fechaNacimiento',
          type: 'date',
          label: 'Fecha de nacimiento'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: ( data ) => {
            this.fechaNac = new Date( data );
            if( this.fechaNac >= new Date() ) {
              this.getFechaNac();
            } else {
              this.fechaNac = data.fechaNacimiento;
              this.getEdad();
            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.router.navigate(['/pacientes']);
          }
        }
      ]
    });
    
    await alert.present();
  }

  // calculate
  calculate() {
    let masa:number = 0;
    let talla:number = 0;
    let tallaSentado:number = 0;
    let brazosEnvergadura:number = 0;
    let triceps:number = 0;
    let subescapular:number = 0;
    let biceps:number = 0;
    let pectoral:number = 0;
    let axilar:number = 0;
    let cresta:number = 0;
    let supraespinal = 0;
    let abdominal:number = 0;
    let muslo:number = 0;
    let pierna:number = 0;
    let cabeza:number = 0;
    let cuello:number = 0;
    let brazoRelajado:number = 0;
    let brazoFlexionado:number = 0;
    let antebrazo:number = 0;
    let muneca:number = 0;
    let torax:number = 0;
    let cintura:number = 0;
    let caderas: number = 0;
    let musloGluteo:number = 0;
    let musloMedio:number = 0;
    let piernaPerimetro:number = 0;
    let tobillo:number = 0;
    let acromiale:number = 0;
    let radiale:number = 0;
    let stylion:number = 0;
    let alturaIlloespinal:number = 0;
    let alturaTrochanterion:number = 0;
    let trochanterion:number = 0;
    let pie:number = 0;
    let tibiale:number = 0;
    let biacromial:number = 0;
    let antero:number = 0;
    let biileocrestal:number = 0;
    let transversoTorax:number = 0;
    let anteroPosterior:number = 0;
    let humero:number = 0;
    let biestiloideo:number = 0;
    let femur:number = 0;
    let bimaleolar:number = 0;


    this.infoForm.forEach( val => {
      masa += val['Masa'];
      talla += val['Talla'];
      tallaSentado += val['TallaSentado'];
      brazosEnvergadura += val['BrazosEnvergadura'];
      triceps += val['Triceps'];
      subescapular += val['Subescapular'];
      biceps += val['Biceps'];
      pectoral += val['Pectoral'];
      axilar += val['Axilar'];
      cresta += val['Cresta'];
      supraespinal += val['Supraespinal'];
      abdominal += val['Abdominal'];
      muslo += val['Muslo'];
      pierna += val['Pierna'];
      cabeza += val['Cabeza'];
      cuello += val['Cuella'];
      brazoRelajado += val['BrazoRelajado'];
      brazoFlexionado += val['BrazoFlexionado'];
      antebrazo += val['Antebrazo'];
      muneca += val['Muneca'];
      torax += val['Torax'];
      cintura += val['Cintura'];
      caderas += val['Caderas'];
      musloGluteo += val['MusloGluteo'];
      musloMedio += val['MusloMedio'];
      piernaPerimetro += val['PiernaPerimetro'];
      tobillo += val['Tobillo'];
      acromiale += val['Acromiale'];
      radiale += val['Radiale'];
      stylion += val['Stylion'];
      alturaIlloespinal += val['AlturaIlloespinal'];
      alturaTrochanterion += val['AlturaTrochanterion'];
      trochanterion += val['Trochanterion'];
      pie += val['Pie'];
      tibiale += val['Tibiale'];
      biacromial += val['Biacromial'];
      antero += val['Antero'];
      biileocrestal += val['Biileocrestal'];
      transversoTorax += val['TransversoTorax'];
      anteroPosterior += val['AnteroPosterior'];
      humero += val['Humero'];
      biestiloideo += val['Biestiloideo'];
      femur += val['Femur'];
      bimaleolar += val['BImaleolar'];
    });

    this.numeroRondas = this.infoForm.length;

  
    this.enviar = {
      fecha: moment().format('lll'),
      email: this.ds.getData().email,
      nRondas: this.numeroRondas,
      Slaughter: this.Slaughter(triceps, pierna, this.sexo),
      Yuhasz: this.Yuhasz( triceps, subescapular, cresta, abdominal, muslo, pierna, this.sexo),
      GrasaCarter: this.GrasaCarter(triceps, subescapular, cresta, abdominal, muslo, pierna, this.sexo),
      Faulkner: this.Faulkner(triceps, subescapular, supraespinal, abdominal, this.sexo),
      // Aristizabal2018: this.Aristizabal2018(triceps, pierna, perimetro)
      // Aristizabal2019: this.Aristizabal2019(triceps, axilar, perimetro)
      DurninRahama: this.DurninRahama(triceps, biceps, subescapular, cresta, this.sexo),
      // JacsonCols: this.JacsonCols(triceps)
      DurningWomersley: this.DurningWomersley(triceps, biceps, subescapular, cresta, this.edad, this.sexo),
      pacienteId: this.ds.getPacienteId()
      // JacksonPollock: this.JacksonPollock(triceps, subescapular, cresta, abdominal, muslo, muslo)
    }

    this.fs.insert_test_info( this.enviar );
  }

  // Pruebas
  Slaughter( triceps:number, pierna:number, sexo:string ) {
    let resultado:number;
    if( sexo === 'M') {
      // Niños
      resultado = .735 * ( (triceps/this.numeroRondas) + (pierna/this.numeroRondas) ) + 1;
      return Number(resultado.toFixed(2));
    } else {
      // Niñas
      resultado = .631 * ( (triceps/this.numeroRondas) + (pierna/this.numeroRondas) ) + 5.1;
      return Number(resultado.toFixed(2));
    }
  }

  Yuhasz( triceps:number, subescapular:number, crestaIliaca:number, abdominal:number, muslo:number, pierna:number, sexo:string  ) {
    if( sexo === 'M') {
      // Niños
      return 3.64 + (( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pierna/this.numeroRondas) ) * .097);
    } else {
      // Niñas
      return 4.56 + (( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pierna/this.numeroRondas) ) * .143);
    }
  }

  GrasaCarter( triceps:number, subescapular:number, crestaIliaca:number, abdominal:number, muslo:number, pierna:number, sexo:string ) {
    if( sexo === 'M' ) {
      // Hombres
      return .1051 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pierna/this.numeroRondas) ) + 2.58;
    } else {
      // Mujeres
      return .1548 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pierna/this.numeroRondas) ) + 3.58;
    }
  }

  Faulkner( triceps:number, subescapular:number, suparespinal:number, abdominal:number, sexo:string ) {
    if( sexo === 'M' ) {
      // Hombres
      return .153 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (suparespinal/this.numeroRondas) + (abdominal/this.numeroRondas) ) + 5.783;
    } else {
      // Mujeres
      return .213 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (abdominal/this.numeroRondas) ) + 7.9;      
    }
  }

  Aristizabal2018( triceps:number, pierna:number, perimetroAbdomen:number, edad:number, estatura:number ) {
    // Mujeres
    return 11.76 + ( .324 + (triceps/this.numeroRondas) ) + ( .133 * (pierna/this.numeroRondas) ) + ( .347 * (perimetroAbdomen/this.numeroRondas) ) + ( .068 * (edad/this.numeroRondas) ) - ( 0.135 * (estatura/this.numeroRondas) );
  }

  Aristizabal2019( triceps:number, axilar:number, perimetroAbdomen:number, edad:number, estatura:number ) {
    // Mujeres
    return 11.37 + ( .404 * (triceps/this.numeroRondas) ) + ( .154 * (axilar/this.numeroRondas) ) + ( .264 * (perimetroAbdomen/this.numeroRondas) ) + ( .069 * (edad/this.numeroRondas) ) - ( .099 * (estatura/this.numeroRondas) );
  }

  DurninRahama( triceps:number, biceps:number, subescapular:number, crestaIliaca:number, sexo:string ) {
    let resultado:number;
    // Niños
    if( sexo === 'M' ){
      resultado = 1.1533 - 0.0643 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
      return Number(resultado.toFixed(4));
    } else {
      // Niñas
      resultado = 1.1369 - 0.0598 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
      return Number(resultado.toFixed(4));  
    }

  }

  
  JacsonCols( triceps:number, suprailiaco:number, abdominal:number, muslo:number, edad:number ) {
    return 1.096095 - ( 0.0006952 * ( (triceps/this.numeroRondas) + (suprailiaco/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) )) + ( 0.0000011 * ( triceps + (suprailiaco/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) )) - ( 0.0000714 * edad );
  }

  DurningWomersley( triceps:number, biceps:number, subescapular:number, crestaIliaca:number, edad:number, sexo:string ) {
    console.log( edad );
    let resultado: number;
    if( sexo === 'M' ) {
      switch ( true ) {
        case edad >= 20 && edad < 30:
          // Hombres 20 - 29
          resultado = 1.631 - .0632 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;

        case edad >= 30 && edad < 40:
          // Hombres 30 - 39
          resultado = 1.1422 - .05444 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;

        case edad >= 40 && edad < 50:
          // Hombres 40 - 49
          resultado = 1.1620 - 0.0700 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;
      
        case edad >= 50 && edad < 72:
          // Hombres 50 - 72
          resultado = 1.1715 - .0799 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;

        case edad >= 17 && edad < 72:
          // Hombres 17 - 72 ??????
          resultado = 1.1765 - .0744 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;
      }
    } else {
      switch (true) {
        case edad >= 20 && edad < 29:
          // Mujeres 20 - 29
          resultado = 1.1599 - .0717 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;
          
        case edad >= 30 && edad < 40:
          // Mujeres 30 - 39
          resultado = 1.1423 - .0632 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;

        case edad >= 40 && edad < 50:
          // Mujeres 40 - 49
          resultado = 1.1333 - .0612 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;
        
        case edad >= 50 && edad < 72:
          // Mujeres 50 - 72
          resultado = 1.339 - .0645 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) );
          break;
        
        case edad >= 16 && edad < 72:
          // Mujeres 16 - 72 ???
          resultado = 1.1567 - .0717 * Math.log10( (triceps/this.numeroRondas) + (biceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) ); 
          break;
      }

    }

    return resultado;

  }

  JacksonPollock( triceps:number, subescapular:number, crestaIliaca:number, abdominal:number, muslo:number, musloFrontal:number, pectoral:number, axilar:number, axilarMedio:number, edad:number, perimetroAbdominal:number, perimetroAntebrazo:number, sexo:string ) {
    let resultado:number;
    if( sexo === 'M' ) {
      // Hombres 18 - 61
      return 1.17615 - .02394 * Math.log( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pectoral/this.numeroRondas) + (axilar/this.numeroRondas) ) - .00022 * ( edad ) - .0075 * ( (perimetroAbdominal/this.numeroRondas) ) + .02120 * ( (perimetroAntebrazo/this.numeroRondas) );
    } else {
      // Mujeres 15 - 55
      resultado = 1.112 - .00043499 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (muslo/this.numeroRondas) + (pectoral/this.numeroRondas) + (axilar/this.numeroRondas) ) + .00000055 * ( (triceps/this.numeroRondas) + (subescapular/this.numeroRondas) + (crestaIliaca/this.numeroRondas) + (abdominal/this.numeroRondas) + (musloFrontal/this.numeroRondas) + (pectoral/this.numeroRondas) + (axilarMedio/this.numeroRondas) )^2 - .000288826 * edad;
    }

    return resultado;
  }

}
