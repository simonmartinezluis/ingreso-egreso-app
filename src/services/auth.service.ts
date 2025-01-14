import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFireBase: AngularFireAuth) { }

  initAuthListener() {
    this.authFireBase.authState.subscribe(userState => {
      console.log('sesion state:',userState);
    });
  }

  createUserInFirebase(nombre: string, email: string, password: string) {
    return this.authFireBase.createUserWithEmailAndPassword(email, password);
  }

  loginWithFirebase(email: string, password: string) {
    return this.authFireBase.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authFireBase.signOut();
  }

  isAuth() {
    return this.authFireBase.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    )
  }
}
