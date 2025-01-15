import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { UserModel } from 'src/app/models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFireBase: AngularFireAuth, private readonly angularFirestore: AngularFirestore) { }

  initAuthListener() {
    this.authFireBase.authState.subscribe(userState => {
      console.log('sesion state:', userState);
    });
  }

  async createUserInFirebase(nombre: string, email: string, password: string): Promise<void> {
    try {
      const newFirebaseUser: any = await this.authFireBase.createUserWithEmailAndPassword(email, password);
      const newUser = {
        email: newFirebaseUser.user.email,
        nombre: nombre,
        uid: newFirebaseUser.user.uid
      };
      await this.angularFirestore.doc(`${newUser.uid}/usuario`).set(newUser);
    } catch (error) {
      console.error('Error creating user in Firebase:', error);
      throw error;
    }
  }

  loginWithFirebase(email: string, password: string) {
    return this.authFireBase.signInWithEmailAndPassword(email, password);
  }

  logoutFirebase() {
    return this.authFireBase.signOut();
  }

  isAuth() {
    return this.authFireBase.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    )
  }
}
