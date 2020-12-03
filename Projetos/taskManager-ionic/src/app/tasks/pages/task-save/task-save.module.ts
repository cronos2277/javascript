import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskSavePageRoutingModule } from './task-save-routing.module';

import { TaskSavePage } from './task-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskSavePageRoutingModule
  ],
  declarations: [TaskSavePage]
})
export class TaskSavePageModule {}
