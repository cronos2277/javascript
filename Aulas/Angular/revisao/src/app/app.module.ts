import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagDirective } from './tag.directive';
import { FormsModule } from '@angular/forms';
import { AppRet1 } from './ret1.component';
import { AppRet2 } from './ret2.component';
import { AppRet3 } from './ret3.component';
import { HttpClientModule } from '@angular/common/http';
import { StructureDirective } from './structure.directive';
@NgModule({
  declarations: [
    AppComponent,
    TagDirective,
    AppRet1,
    AppRet2,
    AppRet3,
    StructureDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
