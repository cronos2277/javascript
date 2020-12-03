import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToggleComponent } from './menu-toggle/menu-toggle.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({  
  declarations:[LogoutComponent,MenuToggleComponent],
  imports:[IonicModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MenuToggleComponent,
    LogoutComponent
  ]
})
export class SharedModule { }
