import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private authServie:AuthService,
    private navCtrl:NavController,
    private overlayService:OverlayService
  ) { }

  ngOnInit() {}

  async logout():Promise<void>{
    await this.overlayService.alert({
      message:"Do you really want to quit?",
      buttons:[
        {
          text:'yes',
          handler: async () => {
              await this.authServie.logout();
              this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    })
  }
}
