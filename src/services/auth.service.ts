import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFireBase: AngularFireAuth) { }

  createUserInFirebase(nombre: string, email: string, password: string) {
    return this.authFireBase.createUserWithEmailAndPassword(email, password);
  }

  loginWithFirebase(email: string, password: string) {
    return this.authFireBase.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.authFireBase.signOut();
  }
}
