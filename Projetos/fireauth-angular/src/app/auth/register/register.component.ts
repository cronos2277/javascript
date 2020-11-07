import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister:FormGroup = this.fb.group({
    'firstname':['',[Validators.required]],
    'lastname':['',[Validators.required]],
    'address':['',[]],
    'city':['',[]],
    'state':['',[]],
    'phone':['',[]],
    'mobilephone':['',[]],
    'email':['',[Validators.required,Validators.email]],
    'password1':['',[Validators.required,Validators.minLength(6)]],
    'password2':['',[Validators.required,Validators.minLength(6)]],
  },{validator:this.matchingPasswords}); 

  public readonly states:string[] = [ 
    "AC", "AL", "AM", "AP", "BA", "CE",
    "DF", "ES", "GO", "MA", "MT", "MS", 
    "MG", "PA", "PB", "PR", "PE", "PI", 
    "RJ", "RN", "RO", "RS", "RR", "SC",
    "SE", "SP", "TO"
  ];

  constructor(
      private fb:FormBuilder,
      private authService:AuthService,
      private snackBar:MatSnackBar,
      private router:Router
      ) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup):{matching:boolean}{
    if(group){
      const pass1 = group.controls['password1'].value;
      const pass2 = group.controls['password2'].value;    
      if(pass1 == pass2) return null;    
    }
    return {matching:false};
  }

  onSubmit(){
    const newUser:User = {
      firstName: this.formRegister.value.firstname,
      lastName: this.formRegister.value.lastname,
      address: this.formRegister.value.address,
      city: this.formRegister.value.city,
      state: this.formRegister.value.state,
      phone: this.formRegister.value.phone,
      mobilephone: this.formRegister.value.mobilephone,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password1            
    }
    this.authService.register(newUser)
    .subscribe(
      u =>{
            this.snackBar.open('Successfully registered!','OK',{duration:3000});
            this.router.navigateByUrl('/auth/login');
          },
      error => {
        console.error(error);
        this.snackBar.open("Error! You are not registered!",'OK',{duration:3000});
      }
    )
  }
}
