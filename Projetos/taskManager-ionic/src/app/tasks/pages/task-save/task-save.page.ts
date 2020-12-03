import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { TasksService } from 'src/app/core/classes/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  public taskForm:FormGroup;
  public pageTitle:string = "...";
  public taskId:string = undefined;

  constructor(
    private fb:FormBuilder, 
    private tasksService:TasksService,
    private navCtrl:NavController,
    private overlayService:OverlayService,
    private route:ActivatedRoute
  ) { }

  ngOnInit():void {
    this.createForm();
    this.init();
  }

  public init():void{
    const taskId = this.route.snapshot.paramMap.get('id');
    if(!taskId){
      this.pageTitle = "Create Task";
      return;
    }
    this.taskId = taskId;
    console.log('taskId: ',taskId);
    this.pageTitle = "Edit Task";
    this.tasksService
    .get(taskId)
    .pipe(take(1))
    .subscribe(({done, title}) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
    });
  }

  private createForm():void{
    this.taskForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(3)]],
      done:[false]
    });

  }

  public async onSubmit():Promise<void>{
    const loading = await this.overlayService.loading({
      message:"Saving..."
    });

    try{
      let task = null; 
      
      if(!this.taskId){      
        task = await this.tasksService.create(this.taskForm.value);
      }else{
        task = await this.tasksService.update({id: this.taskId,... this.taskForm.value});
      } 
      this.overlayService.toast({message:`${task.title} saved!`});
      this.navCtrl.navigateBack('/tasks');
    }catch(error){
      this.overlayService.toast({message:error.message})
    }finally{
      loading.dismiss();
    }
  }

}
