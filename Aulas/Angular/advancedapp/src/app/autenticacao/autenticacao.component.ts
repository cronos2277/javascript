import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs';
import { User } from './User.model';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  users$:Observable<User[]> = null;  
  mensagemErro:string = "Nenhum elemento a ser exibido";     
  formCreate:FormGroup = this.formBuilder.group({
    'name': new FormControl("",[Validators.required]),
    'user': ['',[Validators.required]],
    'pass': ['',[Validators.required]],
    'confirm': ['',[Validators.required]],
    },{
      validator:this.matchingPassword
    });

  formLogin:FormGroup = this.formBuilder.group({
    'user': ['',[Validators.required]],
    'pass': ['',[Validators.required]]
  });  

  constructor(
    private service:ServicoService, 
    private formBuilder:FormBuilder,
    private router:Router    
    ) { 

  }

  ngOnInit() {
    this.users$ = this.service.getUsers();   
  }

  public matchingPassword(group:FormGroup){
    const pass = group.controls['pass'].value;
    const confirm = group.controls['confirm'].value;
    if(pass == confirm) return false;
    return {matchingError:true};
  }

  public onRecord(){    
    if(this.formCreate.valid){
      let user:User = {...this.formCreate.value};
      this.service.register(user).subscribe(
        (registred:User) => window.alert(registred.name + " was recorded with success!"),
        erro => console.error(erro.error.message)
      );
    }else{      
      alert((this.formCreate.errors)?"Password doesn't matching!":"All fields are required!");
    }
  }

  public remove(user:User){    
    console.log("excluindo");
    this.service.remove(user).subscribe(
      (userm:any) => {
          alert(`${user.name} ${userm.message}`);
          window.location.href = "/";
        },
      error => alert(`${error.message}`)       
    );

  }

  public onsbmt(){
    console.log(this.formLogin.value)
    this.service.login(this.formLogin.value).subscribe(
      (user:any) => alert(`The ${user.user.name} is ${user.message}`),
      error => alert(`${error.message}`)
    );    
  }
}
