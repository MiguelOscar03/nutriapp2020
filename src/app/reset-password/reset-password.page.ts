import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetForm = this.fb.group({
      Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  async onReset() {
    const email:string = this.resetForm.controls['Email'].value;

    if ( email ) {
      this.authService.ResetPassword( email )
      .then( () => {
        this.createSuccessAlert( 'Verificar correo' );
      })
      .catch( e => {
        switch ( e.code ) {
          case 'auth/invalid-email':
            this.createErrorAlert( 'El correo no es válido' );
            break;
          
          case 'auth/user-not-found':
            this.createErrorAlert( 'Este correo no está registrado' );
            break;
        }
      });
    }

  }

  async createSuccessAlert( message:string ) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }

  async createErrorAlert( message:string ) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
