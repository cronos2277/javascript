import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  @Input() menu:string;
  constructor(
    private authServie:AuthService,
    private menuCtrl:MenuController,
    private navCtrl:NavController,
    private overlayService:OverlayService
  ) { }

  public async ngOnInit():Promise<void> {
    if(!(await this.menuCtrl.isEnabled())){
      this.menuCtrl.enable(true,this.menu);
    }
  }

  async logout():Promise<void>{
    await this.overlayService.alert({
      message:"Do you really want to quit?",
      buttons:[
        {
          text:'yes',
          handler: async () => {
              await this.authServie.logout();
              await this.menuCtrl.enable(false, this.menu);
              this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    })
  }
}
