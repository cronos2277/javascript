import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  private nameControl = new FormControl('',[Validators.required,Validators.minLength(4)]);

  constructor(private fb:FormBuilder) { }

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

  public onSubmit():void{
    console.log(this.authForm.value);
  }

}
