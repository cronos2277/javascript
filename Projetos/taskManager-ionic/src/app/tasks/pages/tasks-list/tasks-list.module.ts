import { NgModule } from '@angular/core';
import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [{path:'',component:TasksListPage}]

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,    
    RouterModule.forChild(routes)
  ],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
