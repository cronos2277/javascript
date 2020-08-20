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
    this.form.reset();
  }

  private add(user:User){
    if(this.form.valid){ 
      user.id = Math.round(Math.random()* 1000000);     
      this.service.add(user);
    }else{
      console.error("Error on add!");
    }
  }

  private update(user:User){
    if(this.form.valid){
      //Digite o codigo de atualizacao aqui
      
    }else{
      console.error("Error on update!");
      console.log(this.form.value.id)      
    }
  }

  

}
