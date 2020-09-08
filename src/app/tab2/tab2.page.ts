import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  dates = [];
  constructor(
    private fs: FirebaseService,
    // private ds: DataService,
    private router: Router
  ) {
    this.fs.read_history().snapshotChanges().subscribe( data => {
      this.dates = data.map( e => {
        return {
          fecha: e.payload.doc.data()['fecha'],
          rondas: e.payload.doc.data()['nRondas'],
          Slaughter: e.payload.doc.data()['Slaughter'],
          Yuhasz: e.payload.doc.data()['Yuhasz'],
          GrasaCarter: e.payload.doc.data()['GrasaCarter'],
          Faulkner: e.payload.doc.data()['Faulkner'],
          DurninRahama: e.payload.doc.data()['DurninRahama'],
          DurningWomersley: e.payload.doc.data()['DurningWomersley']
        }
      })
      
    });
  }

  sendTestData( fecha, rondas, Slaughter, Yuhasz, GrasaCarter, Faulkner, DurninRahama, DurningWomersley ) {
    // this.ds.setTestInfo( fecha, rondas, Slaughter, Yuhasz, GrasaCarter, Faulkner, DurninRahama, DurningWomersley );
    this.router.navigate(['/tabs/eval', {fecha, rondas, Slaughter, Yuhasz, GrasaCarter, Faulkner, DurninRahama, DurningWomersley}]);
  }

}
