import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authForm:FormGroup;

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

  private createForm():void{
    this.authForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit():void{
    console.log(this.authForm.value);
  }

}
