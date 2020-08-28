import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes:Routes = [
  {path:'',pathMatch:'full',redirectTo:'/main/people'},
  {path:'main',loadChildren:'./main/main.module#MainModule'},
  {path:'**',component:NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ]
})
export class AppRoutingModule { }
