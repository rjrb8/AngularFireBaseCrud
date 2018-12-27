import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore'
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';

/*import {  Observable, of as observableOf } from 'rxjs'
import { map, filter, switchMap } from 'rxjs/operators'*/

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  /*uid = this.afAuth.authState.pipe(
    switchMap(authState => {
      if (!authState) {
        return null
      }else { 
        return authState.uid
      }
    }),  
  );

  isAdmin: Observable<boolean> = this.uid.pipe(
   switchMap(uid => {
      if (!uid) {
        return observableOf(false)
      } else {
        return this.dba.object<boolean>('/admin' + uid).valueChanges(); 
      }
    })
  );*/

  constructor(public afAuth: AngularFireAuth, public db:AngularFirestore) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject)=>{
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No es un usuario');
        }
      })
    })
  }


}
