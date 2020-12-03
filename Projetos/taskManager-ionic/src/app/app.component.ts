import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Page } from './tasks/models/page.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public user;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService
  ) {
    this.initializeApp();
  }

  public pages:Page[];

  initializeApp() {
    this.pages = [
      {url:'/tasks/create', direction:'forward', icon:'add',text:'New Task'},
      {url:'/tasks', direction:'back', icon:'bookmark',text:'All Tasks'},
    ];

    this.authService.authState$.subscribe(user => this.user = user);

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
