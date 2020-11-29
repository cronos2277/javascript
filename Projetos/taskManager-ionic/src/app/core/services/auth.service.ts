import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {User} from '../user.model';
import {Providers} from '../providers.enum';
import {Login} from '../login.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<any> 
  constructor(
        private afAuth:AngularFireAuth,
        private authService: SocialAuthService  
      ) {
        this.authState$ = this.afAuth.authState;        
      }

      get isAutenticated():Observable<boolean>{
        return this.authState$.pipe(map(user => user !== null));
      }

  public autenticate({isSignIn,user,provider}:Login):Promise<any>{
    let operation:Promise<any>
      if(provider !== Providers.Email){
        operation = this.signInWithPopup(provider);
      }else{
        operation = (isSignIn)?this.signInWithEmail(user):this.signUpWithEmail(user);
      }
    return operation;
  }

  public logout():Promise<void>{
    return this.afAuth.signOut();
  }

  private signInWithEmail({email,password}:User):Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email,password);    
  }

  private signUpWithEmail({email,password, name, photoURL = null}:User):Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then(credentials => credentials.user.updateProfile(
          {displayName: name, photoURL:photoURL}
      ).then(() => credentials)
    )    
  }

  private signInWithPopup(provider:Providers):Promise<any>{
    let signInProvider = null;    
    switch(provider){
      case Providers.facebook: signInProvider = this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
        break;
      case Providers.google: signInProvider = this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        break
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }
}
