import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { TasksService } from 'src/app/core/classes/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit,AfterViewInit {

  public tasks$:Observable<Task[]>;
  private loading:Promise<HTMLIonLoadingElement>;

  constructor(
    private tasksService:TasksService,
    private navCtrl:NavController,
    private overlayService:OverlayService
    ) { }

  public async ngOnInit(){
      this.loading = this.overlayService.loading();
  }

  public async ngAfterViewInit(){
      await (await this.loading).dismiss();
  }

  public ionViewDidEnter():void {
    this.tasks$ = this.tasksService.getAll();    
  }

  public onUpdate(task: Task):void{
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
  }

  public async onDelete(task:Task):Promise<void>{
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons: [
        {
          text:'Yes',
          handler: async () =>{
              await this.tasksService.delete(task);
              await this.overlayService.toast({
                message: `Task "${task.title}" was deleted!`
              });
          } 
        },'No'
      ]
    });
  }

  public async onDone(task:Task):Promise<void>{
    const taskToUpdate = {... task, done: !task.done };
    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}" was ${taskToUpdate.done ? 'completed': 'updated'}!`
    });
  }

}
