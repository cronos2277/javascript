import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TasksService } from 'src/app/core/classes/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  public tasks$:Observable<Task[]>;

  constructor(private tasksService:TasksService) { }

  public ionViewDidEnter():void {
    this.tasks$ = this.tasksService.getAll();    
  }

}
