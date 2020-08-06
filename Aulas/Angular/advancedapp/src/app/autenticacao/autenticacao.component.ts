import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs';
import { User } from './User.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  users$:Observable<User[]> = null;  
  mensagemErro:string = "Nenhum elemento a ser exibido";     
  formCreate:FormGroup = this.formBuilder.group({
    'name': ['',[Validators.required]],
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
    private formBuilder:FormBuilder    
    ) { 

  }

  ngOnInit() {
    this.users$ = this.service.getUsers();   
  }

  public matchingPassword(group:FormGroup){
    const pass = group.controls['pass'].value;
    const confirm = group.controls['confirm'].value;
    if(pass == confirm) return false;
    return {matching:true};
  }

  public onRecord(){
    let user:User = {...this.formCreate.value};
    this.service.register(user).subscribe(
      registred => window.alert('cadastrado com sucesso!'),
      erro => console.error(erro.error.message)
    );
  }

  public remove(user:User){
    console.log("Funcao Excluir!");
    console.log(user);
  }
}
