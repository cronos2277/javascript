import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) {
    
  }

  private signInWithEmail({email,password}):Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email,password);    
  }

  private signUpWithEmail({email,password, name, photoURL = null}):Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then(credentials => credentials.user.updateProfile(
          {displayName: name, photoURL:photoURL}
      ).then(() => credentials)
    )
    
  }
}
