import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/tasks/models/task.model';
import { Firestore } from './firestore.class';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task>{

  constructor(db:AngularFirestore) { 
    super(db);    
  }
}
