import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/tasks/models/task.model';
import { AuthService } from '../services/auth.service';
import { Firestore } from './firestore.class';
@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task>{

  constructor(private authService:AuthService, db:AngularFirestore) { 
    super(db);        
    this.init();
  }

  private init():void{
    this.authService.authState$.subscribe(
      user => {
          if(user){
              this.setCollection(`/users/${user.uid}/tasks`, (ref) => 
                  ref.orderBy('done','asc').orderBy('title','asc')
              );
          //this.setCollection(`/users/${user.uid}/tasks`);
            return;
          }
          this.setCollection(null);
      }
    );
  }
}
