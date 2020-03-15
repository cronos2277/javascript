import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductFormComponent } from './product-form/product-form.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ProductTableComponent } from './products-table/products-table.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    DepartmentFormComponent,
    ProductTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
