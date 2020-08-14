import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Pass1: ['', [Validators.required, Validators.minLength(6)]],
      Pass2: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.samePasswords('Pass1', 'Pass2')
    })
  }

  samePasswords( Pass1:string, Pass2:string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[Pass1];
      const pass2Control = formGroup.controls[Pass2];

      if( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors( null );
      } else {
        pass2Control.setErrors( { noEsIgual: true } );
      }
    } 
  }

  async onRegister( ) {
    const email:string = this.registerForm.controls['Email'].value;
    const pass:string = this.registerForm.controls['Pass1'].value;

    const user = await this.authService.RegisterUser( email, pass );

    if ( user ) {
      await this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Verificar tu correo',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
            this.registerForm.reset();
          }
        }
      ]
    });

    await alert.present();

  }
  
}
