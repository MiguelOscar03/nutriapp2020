import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private data: DataService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Pass: ['', [Validators.required]]
    })
  }

  async onSignIn() {
    try {
      const email:string = this.loginForm.controls['Email'].value;
      const pass:string = this.loginForm.controls['Pass'].value;
  
      const user = await this.authService.Login( email, pass );
  
      if( user ) {
        const isVerified = this.authService.IsEmailVerified( user );
        if ( isVerified ) {
          this.data.setData( user.uid, user.email );
          this.router.navigate(['/pacientes']);
        } else {
          this.alertEmail();
        }
      }
    } catch ( error ) {
      console.log( error );

    }
  }

  async alertEmail() {
    const alert = await this.alertController.create({
      message: 'Correo no verificado',
      buttons: ['OK']
    });

    await alert.present();
  }

}
