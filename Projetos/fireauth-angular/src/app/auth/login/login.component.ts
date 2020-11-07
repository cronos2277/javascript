import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = this.fb.group({
    'email': ['',[Validators.required,Validators.email]],
    'password':['',[Validators.required,Validators.minLength(6)]]
  });
  loading:boolean = false;
  
  constructor(
    private fb:FormBuilder,    
      private authService:AuthService,
      private snackBar:MatSnackBar,
      private router:Router
  ) { }

  ngOnInit(): void {
  }

  private loginCorrectNotification(u:User):void{
    this.snackBar.open('logged in successfuly, Welcome '+u.firstName+'!','OK',{duration:3000});
  }

  private loginErrorNotification(err):void{
    this.snackBar.open(err,'OK',{duration:3000});
  }

  public onSubmit():void{
    this.loading = true;
    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.password;    
    this.authService.login(email,pass).subscribe(
        u => {
          this.loginCorrectNotification(u);
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        error => {
          this.loginErrorNotification(error);
          this.loading = false;
        }
      );
  }

  public loginGoogle():void{

  }

}
