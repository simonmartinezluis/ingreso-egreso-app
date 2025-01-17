import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setUser, unSetUser } from 'src/app/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public authFireBase: AngularFireAuth, private readonly angularFirestore: AngularFirestore, private readonly store: Store<AppState>) {
    this.userSubscription = new Subscription();
  }

  initAuthListener() {
    this.authFireBase.authState.subscribe(userState => {
      if (userState) {
        this.userSubscription = this.angularFirestore.doc(`${userState.uid}/usuario`).valueChanges().subscribe((responseUserFireBase: any) => {
          const userFireBase = UserModel.fromFireBase(responseUserFireBase);
          this.store.dispatch(setUser({ user: userFireBase }));
        })
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser());
      }
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

  loginFirebase(email: string, password: string) {
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
