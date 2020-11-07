import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable,from, throwError, of } from 'rxjs';
import { User } from './user';
import {catchError, switchMap,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection:AngularFirestoreCollection<User> = this.afs.collection('users');
  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth
  ) { }

  public register(user:User):Observable<boolean>{
    return from(this.afAuth.createUserWithEmailAndPassword(user.email,user.password))
    .pipe(
      switchMap(
          (u) => {
          return this.userCollection.doc(u.user.uid)
            .set({...user, id:u.user.uid})
            .then(()=>true);                    
          }),
      catchError(err => throwError(err))
    )
  }

  public login(email:string, password:string):Observable<User>{
    return from(this.afAuth.signInWithEmailAndPassword(email,password))
    .pipe(
      switchMap(u => {
        return this.userCollection.doc<User>(u.user.uid).valueChanges()
      }),
      catchError(() => throwError('Invalid credentials or not registered!'))
    )
  }

  public logout():void{
    this.afAuth.signOut();
  }

  public getUser():Observable<User>{
    return this.afAuth.authState
    .pipe(
      switchMap(u => u ? this.userCollection.doc<User>(u.uid).valueChanges():of(null))
    )
  }

  public authenticated():Observable<boolean>{
    return this.afAuth.authState
    .pipe(map(u => (u)?true:false))
  }
}
