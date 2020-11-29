import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
        private afAuth:AngularFireAuth,
        private authService: SocialAuthService  
      ) {
    
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

  private signInWithPopup(provider:string):Promise<any>{
    let signInProvider = null;
    switch(provider){
      case 'facebook': signInProvider = this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
        break;
      case 'google': signInProvider = this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        break
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }
}
