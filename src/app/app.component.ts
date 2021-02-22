import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PwaService } from 'src/app/services/pwa.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate,
    private storage : Storage,
    private uiService: UiServiceService,
    private pwaService: PwaService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
        
      if (this.swUpdate.available) {
        this.swUpdate.available.subscribe(async () => {
          const alertButtons = { confirm: "Si", deny:"No" };
          const confirmationMessage = 'Una nueva versión está disponible. ¿Desea Actualizarla?';
          const confirmaInstalacion =  await this.uiService.alertaConfirmacion(confirmationMessage, 'reload-outline','success',alertButtons);
          if(confirmaInstalacion) { 
              window.location.reload();
          } 
        });
      }
          
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        this.setPwaEvent(e);     
      });

      window.addEventListener('appinstalled', (evt) => {
        this.setInstalledFlag(true);
      });
    });
  }

  async setInstalledFlag(flag) {
    await this.storage.set('installedPWA', flag);
  }

  async setPwaEvent(event) {
    await this.pwaService.setPwaEvent(event);
    await this.storage.set('pwaEvent', JSON.stringify(event));
  }

}
