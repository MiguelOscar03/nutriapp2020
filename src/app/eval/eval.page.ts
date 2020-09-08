import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.page.html',
  styleUrls: ['./eval.page.scss'],
})
export class EvalPage implements OnInit {

  val = null;

  // testData: {
  //   fecha,
  //   rondas,
  //   primerCalculo,
  //   segundoCalculo
  // };

  constructor(
    private activatedRoute: ActivatedRoute
    // private ds: DataService
  ) { }

  ngOnInit() {
    this.val = {
      fecha: this.activatedRoute.snapshot.paramMap.get('fecha'),
      rondas: this.activatedRoute.snapshot.paramMap.get('rondas'),
      Slaughter: this.activatedRoute.snapshot.paramMap.get('Slaughter'),
      Yuhasz: this.activatedRoute.snapshot.paramMap.get('Yuhasz'),
      GrasaCarter: this.activatedRoute.snapshot.paramMap.get('GrasaCarter'),
      Faulkner: this.activatedRoute.snapshot.paramMap.get('Faulkner'),
      DurninRahama: this.activatedRoute.snapshot.paramMap.get('DurninRahama'),
      DurningWomersley: this.activatedRoute.snapshot.paramMap.get('DurningWomersley')
    }
  }

}
