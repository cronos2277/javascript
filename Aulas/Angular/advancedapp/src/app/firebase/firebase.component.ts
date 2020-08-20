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
  }

  private add(user:User){
    this.service.add(user);
  }

  private update(user:User){

  }

  

}
