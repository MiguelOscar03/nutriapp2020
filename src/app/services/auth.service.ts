import { Injectable } from '@angular/core';
import { User } from '../../constantes/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  
  constructor(
    // private user: User,
    private afStore: AngularFirestore,
    private ngFireAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  // Login 
  async Login( email:string, password:string ): Promise<User> {
    try {
      const { user } = await this.ngFireAuth.signInWithEmailAndPassword( email, password );
      this.updateUserData( user );
      return user;
    } catch ( error ) {
      switch ( error.code ) {
        case 'auth/user-not-found':
          this.createAlert('Usuario no encontrado');
          break;
        case 'auth/invalid-email':
          this.createAlert('Correo no válido');
          break;
        case 'auth/wrong-password':
          this.createAlert('Contraseña incorrecta');
      }
      console.log( error.code );
    }
    
  }

  // Register
  async RegisterUser( email:string, password:string ): Promise<User> {
    try {
      const { user } = await this.ngFireAuth.createUserWithEmailAndPassword( email, password );
      await this.SendVerificationEmail();
      return user;
    } catch ( error ) {
      switch ( error.code ) {
        case 'auth/email-already-in-use':
          this.createAlert('Este correo ya está registrado');
          break;
        case 'auth/weak-password':
          this.createAlert('La contraseña debe de ser mínimo 6 caracteres');
          break;
        case 'auth/invalid-email':
          this.createAlert('Correo no válido');
          break;
      }
      console.log( error.code );
    }

  }

  // Send email for verification
  async SendVerificationEmail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification();
  }

  // Email Verified
  IsEmailVerified( user: User ): boolean {
    return user.emailVerified === true ? true : false;
  }

  // Reset password
  async ResetPassword( email:string ) {
    return  await this.ngFireAuth.sendPasswordResetEmail( email );
  }

  // Logout
  async Logout() {
    try {
      await this.ngFireAuth.signOut();
    } catch ( error ) {
      console.log( error );
    }
  }


  // Create alert
  async createAlert( message:string ) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    
    await alert.present();
  }
  
  // Create registers 
  private updateUserData( user: User ) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}