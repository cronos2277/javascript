import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import {Providers} from '../../../core/providers.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authForm:FormGroup;
  public configs = {
    isSingIn:true,
    action: 'Login',
    actionChange: 'Create account'
  };

  public authProviders = Providers

  private nameControl = new FormControl('',[Validators.required,Validators.minLength(4)]);

  constructor
  (
    private fb:FormBuilder, 
    private authService:AuthService,
    private overlayService:OverlayService,
    private navCtrl:NavController,
    private route:ActivatedRoute
  ) 
  {

  }

  ngOnInit():void {
    this.createForm();
  }

  public get email():FormControl{
    return <FormControl>this.authForm.get('email');
  }

  public get password():FormControl{
    return <FormControl>this.authForm.get('password');
  }

  public get name():FormControl{
    return <FormControl>this.authForm.get('name');
  }

  private createForm():void{
    this.authForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  public changeAuthAction():void{
      this.configs.isSingIn = !this.configs.isSingIn;
      const {isSingIn} = this.configs;
      this.configs.action = (isSingIn) ? 'Login' : 'Sign Up';
      this.configs.actionChange = (isSingIn) ? 'Create Account': 'Already have an account';
      if(!isSingIn){
          this.authForm.addControl('name',this.nameControl);
      }else{
          this.authForm.removeControl('name');
      }
  }

  public async onSubmit(provider: Providers):Promise<void>{    
    const loading = await this.overlayService.loading();
    try{
      const credentials = await this.authService.autenticate({
        isSignIn: this.configs.isSingIn,
        user: this.authForm.value,
        provider: provider
      });
      this.navCtrl.navigateForward(
            this.route.snapshot.queryParamMap.get('redirect') || '/tasks'
      );
    }catch(e){
      console.error('Auth error',e);
      await this.overlayService.toast({message:e.message});
    }finally{
      loading.dismiss();
    }
  }

}
