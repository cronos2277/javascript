import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  public taskForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit():void {
    this.createForm();
  }

  private createForm():void{
    this.taskForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(3)]],
      done:[false]
    });

  }

  public onSubmit():void{
    console.log(this.taskForm.value);
  }

}
