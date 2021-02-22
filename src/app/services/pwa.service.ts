import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
@Injectable({
	providedIn: 'root'
})
export class PwaService{
    pwaInstallerEvt;
    userInstallChoice = true;
    isIOS: boolean = false;
    isAndroid: boolean = false;

    constructor(
        private platform: Platform,
        private storage:Storage,
        private toastController: ToastController,
        private navCtrl: NavController
        ) { 
          this.isIOS = platform.is ('ios');
          this.isAndroid = platform.is ('android');
    }

    async setPwaEvent(ev) {
      this.pwaInstallerEvt = ev;
    }

    async initializePwa() {
        const isPwaInstalled = await this.isPWAInstalled();
        const hasSeenIOSWelcome = await this.hasSeenIOSWelcomeScreen();
        console.log(this.isIOS +" - "+ isPwaInstalled)
            
        if (this.isIOS && !isPwaInstalled && !hasSeenIOSWelcome) {
          const iosToast = await this.toastController.create({
              header: 'Mi HEB Móvil',
              position: 'bottom',
              color: 'danger',
              buttons: [
                {
                    icon: 'arrow-down-circle-outline',
                    text: 'AGREGAR APP',
                    handler: async() => {
                      await this.storage.set('hasSeenIOSWelcome', true);
                      this.navCtrl.navigateRoot('/splash');
                    }
                }, {
                    side: 'start',
                    icon: 'close-outline',
                    role: 'cancel',
                    handler: () => {
                    console.log('Cancel Splash');
                    }
                }
                ]
            });
          iosToast.present();
        } else if(this.isAndroid) {
            this.installPwa();
        }

    }

    async setInstalledFlag(flag) {
        await this.storage.set('installedPWA', flag);
    }

    isMobile (): boolean { return this.platform.is ('mobile'); }
    isPWA (): boolean { return this.platform.is ('pwa'); }
    isTablet (): boolean { return this.platform.is ('tablet'); }
    async isPWAInstalled (): Promise<boolean> { return await this.storage.get('installedPWA'); }
    async hasSeenIOSWelcomeScreen (): Promise<boolean> { return await this.storage.get('hasSeenIOSWelcome'); }
    

    async installPwa() {
      const isPwaInstalled = await this.isPWAInstalled();
      if(!isPwaInstalled || isPwaInstalled == undefined) {
        const toast = await this.toastController.create({
          header: 'Mi HEB Móvil',
          position: 'bottom',
          color: 'success',
          buttons: [
            {
              icon: 'arrow-down-circle-outline',
              text: 'INSTALAR APP',
              handler: async () => {
                if(this.pwaInstallerEvt) {
                  this.pwaInstallerEvt.prompt()
                  this.pwaInstallerEvt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === 'accepted') {
                        this.userInstallChoice = true;
                        this.setInstalledFlag(true);
                        console.log('User accepted the install prompt');
                      } else {
                        this.userInstallChoice = false;
                        console.log('User dismissed the install prompt');
                      }
                      }) 
                      .catch( function ( err ) { if ( err.message.indexOf( "user gesture" ) > -1 ) { 
                        console.log("Falta el gesture")
                      } else if ( err.message.indexOf( "The app is already installed" ) > -1 ) { 
                        console.log("Ya está instalada la PWA")
                      } else { 
                      return err; 
                      } 
                    })
                }
              }
            }, {
              side: 'start',
              icon: 'close-outline',
              role: 'cancel',
              handler: () => {
                console.log('Cancel Installation');
              }
            }
          ]
        });
        toast.present();
      }
      
    }



}