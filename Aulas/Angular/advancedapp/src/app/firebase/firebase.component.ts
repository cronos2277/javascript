import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../firebase/table.model';
import {ServiceService} from './service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {

  users$:Observable<User[]>

  constructor(
      private formBuilder:FormBuilder,
      private service:ServiceService
      ) { }
  
  ngOnInit() {
    this.users$ = this.service.getProducts();
  }

  form:FormGroup = this.formBuilder.group({
    id: [undefined],
    name: ["",Validators.required],
    user: ["",Validators.required],
    pass: ["",Validators.required],    
  });

  public submit(){
    if(this.form.invalid) alert(this.form.errors);
    const user:User = this.form.value;
    if(user.id){
      this.update(user);
    }else{
      this.add(user);
    }
    /*
      O reset ele limpa o formulario, sem parametros
      ele deixa todos os campos em branco, voce pode
      usar um objeto caso voce queira que um valor 
      volte ao padrao, por exemplo, eu quero que o
      id seja zero nesse caso "this.form.reset({id:0})",
      o id vira zero e os outros campos ficam em branco.
    */
    this.form.reset();
  }

  private add(user:User){
    if(this.form.valid){       
      this.service.add(user);
      
    }else{
      console.error("Error on add!");
    }
  }

  private update(user:User){
    if(this.form.valid){
      this.service.update(user);
      
    }else{
      console.error("Error on update!");
      console.log(this.form.value.id)      
    }
  }

  public delete(user:User){
    /*
      O Confirm eh uma caixa de dialogo que te faz uma
      pergunta, se clicar em si retorna true e a exclusao
      segue em frente, se clicar em cancelar ou em fechar
      o confirm retorna falso e ai nao prossegue.
    */
    if(confirm(`Do you want to remove ${user.name}?`)){
      this.service.delete(user);
    }
  }
  
  public set(user:User){
    /*
      Voce pode colocar valores em reactive forms usando a
      funcao setValue, no caso voce passa o objeto que contem
      os atributos ou cria um objeto contendo atributos e valores
      e o setValue vai colocar os valores setados aqui no formulario.
    */
    this.form.setValue(user);
  }

}
